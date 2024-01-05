import express from 'express';
import { loginUser, signupUser } from '../controllers/user.controllers.js';

const router = express.Router({ mergeParams: true });

router
  .route('/register')
  .get((req, res) => {
    res.json({ success: true, message: 'This is a register route' });
  })
  .post(signupUser);
router.route('/login').post(loginUser);

export default router;
