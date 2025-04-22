import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        console.log("Request body:", req.body);

        if (!userName || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try differnt email",
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            userName,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const login = async( req, res) =>{
    try {
        const {email, password} = req.body;
        if (!email, !password) {
            return res.status(401).json({
                message: "Something is missing, please check",
                success: false
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        };


        user = {
            _id: user._id,
            userName: user.userName,
            email:user.email,
            profilePic:user.profilePic,
            bio:user.bio,
            followers:user.followers,
            following:user.followers,
            posts:user.posts
        }


        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
        return res.cookie('token', token, {httpOnly:true, sameSite:'strict',maxAge: 1*24*60*60*1000}).json({
            message: `Welcome back ${user.userName}`,
            success:true,
            user
        });
    } catch (error) {
        console.log(error);
    };
};
export const logout = async (_,res) => {
    try {
        return res.cookie("token", "", {maxAge:0}).json({
            message:'Logged out successfully',
            success:true
        })
    } catch (error) {
        console.log(error);
    };
};
export const getProfile = async(req,res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).select('-password');
        return res.status(200).json({
            user,
            success:true
        });
    } catch (error) {
        console.log(error)
    }
};
export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePic = req.file; // Uploaded file

        let cloudResponse;

        // Validate if a file was uploaded
        if (profilePic) {
            const fileUri = getDataUri(profilePic);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update user fields
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePic) user.profilePic = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: "Profile Updated",
            success: true,
            user
        });
    } catch (error) {
        console.error("Error in editProfile function:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const getSuggestedUsers = async(req,res) => {
    try {
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUsers) {
            return res.status(404).json({
                message: "Currently do not have any users",
            });
        };
        return res.status(200).json({
            success: true,
            users:suggestedUsers
        });
    } catch (error) {
        console.log(error);
        
    }
};
export const followerUser = async(req, res) => {
    try {
        const isFollow = req.id; /// id of the user who is following/unfollowing
        const isFollowing = req.params.id; // id of person who is followedd by user
        if(isFollow === isFollowing){
            return res.status(400).json({
                message: "You can't follow/unfollow yourself",
                success: false,
            });
        }

        const user = await User.findById(isFollow);
        const targetUser = await User.findById(isFollowing);
        if(!user || !targetUser){
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }
        const idFollowing = user.following.includes(isFollowing);
        if(idFollowing){
            await Promise.all([
                User.updateOne({_id:isFollow},{ $pull: { following: isFollowing}}),
                User.updateOne({_id:isFollowing},{ $pull: { followers: isFollow}})

            ])
            return res.status(200).json({message: "Unfollow successfuly", success: true});
        }else{
            await Promise.all([
                User.updateOne({_id:isFollow},{ $push: { following: isFollowing}}),
                User.updateOne({_id:isFollowing},{ $push: { followers: isFollow}})

            ]);
            return res.status(200).json({message: "followed successfuly", success: true});
        };

    } catch (error) {
        console.log(error);
        
    }
};