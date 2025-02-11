import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import express from 'express';

const router = express.Router();



router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.put('/update-profile',protectedRoute, updateProfile)
router.post('/check',protectedRoute, checkAuth)


export default router;
