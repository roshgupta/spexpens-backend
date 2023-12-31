import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user.models.js';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        const isCorrectPassword = await user.isPasswordCorrect(password);
        if (!isCorrectPassword) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        const { username, email: userEmail, name, _id: id } = user;
        return done(null, { username, email: userEmail, name, id });
      } catch (error) {
        console.log('Unable to authenticate'.bgMagenta);
        return done(error, false);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const { username, email: userEmail, name, _id: id } = user;
        return done(null, { username, email: userEmail, name, id });
      } catch (error) {
        console.log('Auth Failed JWTStrategy'.bgMagenta);
        return done(error, false);
      }
    }
  )
);
