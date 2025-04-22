import express from 'express';
import { editProfile, followerUser, getProfile, getSuggestedUsers, login, logout, register } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/authentitation.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePic'),editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followUser/:id').post(isAuthenticated, followerUser);


export default router