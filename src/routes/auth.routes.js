import express from 'express';
import { loginUser, signupUser } from '../controllers/user.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/login').post(loginUser);
router.route('/regiser').post(signupUser);

export default router;
