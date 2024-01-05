import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const loginUser = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }
    const { username } = user;
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, token, user });
  })(req, res, next);
};

export const signupUser = async (req, res, next) => {
  const { email, password, name, username } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    next({ statusCode: 400, message: 'User with same email already exists' });
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    next({
      statusCode: 400,
      message: 'User with same username already exists',
    });
  }

  const newUser = new User({
    email,
    username,
    password,
    name,
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log('Some error occured while saving the user'.red.bold);
    next(error);
  }
};
