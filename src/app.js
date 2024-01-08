import express, { json, urlencoded } from 'express';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './services/connectDB.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import './services/auth/passport.js';
import 'colors';
import isLoggedIn from './middlewares/auth.middlewares.js';

const PORT = process.env.PORT || 5000;
await connectDB();
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(mongoSanitize());
app.use(passport.initialize());
// app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', isLoggedIn, userRoutes);
app.use('/expense', isLoggedIn, expenseRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'something went wrong' } = err;
  console.error(err);
  return res.status(statusCode).json({ success: false, message });
});

app.listen(PORT, () => {
  console.log(
    `Application is running on http://localhost:${PORT}`.bgBlue.underline
  );
});
