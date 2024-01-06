import express from 'express';
import { loginUser, signupUser } from '../controllers/user.controllers.js';

const router = express.Router({ mergeParams: true });

router.route('/register').post(signupUser);

router.route('/login').post(loginUser);

export default router;
