import sharp from 'sharp';
import cloudinary from '../utils/cloudinary.js';
import Post from '../models/Post.js';
import User from '../models/user.model.js';

export const addNewPost = async(req,res) => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image){ return res.status(400).json({message : "Image required"})};

        // upload image 
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({width:800,height:800,fit:'inside'})
            .toFormat('jpeg', {quality:80})
            .toBuffer();
            // buffer to datauri

            const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri);
            const post = await Post.create({
                caption,
                image:cloudResponse.secure_url,
                author:authorId
            });

            const user = await User.findById(authorId);
            if(user) {
                user.posts.push(post._id);
                await user.save();
            }

            await post.populate({path:'author',select:'-password'});
            return res.status(201).json({
                message: 'New Post Added',
                post,
                success: true
            })
        } catch (error) {
        console.log(error);
        
    };
};

export const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1})
            .populate({path:'author',select:'userName, profilePic'})
            .populate({
                path:'comments',
                sort:{createdAt:-1},
                populate:{
                    path:'author',
                    select:'userName, profilePic'
                }
            });
            return res.status(200).json({
                posts,
                success:true
            })
    } catch (error) {
    console.log(error);
        
    }
};

export const getUserPosts = async(req,res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({author:authorId}).sort({createdAt:-1})
            .populate({path:'author',select:'userName, profilePic'})
            .populate({
                path:'comments',
                sort:{createdAt:-1},
                populate:{
                    path:'author',
                    select:'userName, profilePic'
                }
            });
            return res.status(200).json({
                posts,
                success:true
            })
    } catch (error) {
        console.log(error);
        
    }
};

export const likePost = async(req,res)=> {
    try {
        const postId = req.params.id;
        const postLikeId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({ message: "Post not found",success: false});

        // like logic started
        await post.updateOne({$addToSet:{likes:postLikeId}});
        await post.save();

        // implement socket io for real time notification

        return res.status(200).json({
            message:"Post liked",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const dislikePost = async(req,res)=> {
    try {
        const postId = req.params.id;
        const postLikeId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({ message: "Post not found",success: false});

        // unlike logic started
        await post.updateOne({$pull:{likes:postLikeId}});
        await post.save();

        // implement socket io for real time notification

        return res.status(200).json({
            message:"Post disliked",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const addComment = async(req,res) => {
    try {
        const postId = req.params.id;
        const commentUserId = req.id;
        const { text } = req.body;

        const post = await Post.findById(postId);
        if(!post) return res.status(400).json({message:"text is reqiured",success:false});

        const comment = await Comment.create({
            text,
            author: commentUserId,
            post:postId
        }).populate({
            path:'author',
            select:"userName, profilePic"
        });
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: "Comment added",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const getCommentsOfPost = async(req,res) => {
    try {
        const postId = req.params.id;
        
        const comments = await Comment.find({post:postId}).populate('author','userName','profilePic');

        if(!comments) return res.status(404).json({message:"Comment not found",success:false});

        return res.status(200).json({success:false,comments});
    } catch (error) {
        console.log(error);
        
    };
};

export const deletePost = async(req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'post not found',success:false});

        // check if the logged in user's post
        if(post.author.toString() !== authorId) {
            return res.status(403).json({message:'Unauthorized'});
        }

        // delete post 
        await Post.findByIdAndDelete(postId);

        // remove post from user

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        // delete associated comments 
        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            success:true,
            message:"Post deleted"
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const bookmarkPost = async(req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not Found',success:false});

        const user = await User.findById(authorId);
        if(user.bookmarks.includes(post._id)){
        // Already bookmarked
        await user.updateOne({$pull:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({type:'unsaved',message:'Post remove from bookmark',success:true});
        }else{
        await user.updateOne({$addToSet:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({type:'saved',message:'Post bookmarked',success:true});
        }
    } catch (error) {
        console.log(error);
        
    }
}