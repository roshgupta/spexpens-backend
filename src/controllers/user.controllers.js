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
  })(req, res, next);
};

export const signupUser = async (req, res, next) => {
  try {
    const { email, password, name, username } = req.body;
    if (!username || !email || !password || !name) {
      return next({
        statusCode: 400,
        message:
          'Missing fields! Please enter username,email,password and name for registering',
      });
    }

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return next({
        statusCode: 400,
        message: 'User with same email or username already exists',
      });
    }

    const newUser = new User({
      email,
      username,
      password,
      name,
    });

    await newUser.save();
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
    return res.status(200).json({ success: true, token, user: newUser });
  } catch (error) {
    console.log('Some error occured while saving the user'.red.bold);
    return next(error);
  }
};
