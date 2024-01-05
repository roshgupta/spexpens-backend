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
    const { email } = user;
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
    return res.status(200).json({ success: true, token, user });
    // TODO: Remove password from the user which we are sending to user.
  })(req, res, next);
};

export const signupUser = async (req, res, next) => {
  console.log('Register route got hit'.blue);
  const { email, password, name, username } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return next({
      statusCode: 400,
      message: 'User with same email already exists',
    });
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return next({
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
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
    // TODO: Remove password from the user which we are sending to user.
    return res.status(200).json({ success: true, token, user: newUser });
  } catch (error) {
    console.log('Some error occured while saving the user'.red.bold);
    return next(error);
  }
};
