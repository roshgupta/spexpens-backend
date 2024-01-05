import passport from 'passport';

const isLoggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: 'Something went wrong' });
    }
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: 'You are not logged in' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default isLoggedIn;
