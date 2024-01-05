import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './services/connectDB.js';
import authRoutes from './routes/auth.routes.js';
import 'colors';

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

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(
    `Application is running on http://localhost:${PORT}`.bgBlue.underline
  );
});
