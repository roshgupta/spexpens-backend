import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user.models.js';

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      if (!user.isPasswordCorrect(password)) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      return done(null, user);
    } catch (error) {
      console.log('Unable to authenticate'.bgMagenta);
      return done(error, false);
    }
  })
);

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
