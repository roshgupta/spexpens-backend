import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import User from '../../models/user.models.js';

const JWToptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
  new JWTStrategy(JWToptions, async (payload, done) => {
    try {
      const user = await User.findOne({ email: payload.email });
      if (!user)
        return done(null, false, { message: 'Invalid email or password' });
      return done(null, user);
    } catch (error) {
      console.log('Auth Failed JWTStrategy'.bgMagenta);
      return done(error, false);
    }
  })
);
