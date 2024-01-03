import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import 'colors';

const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/', (req, res) => {
  res.json({ key: 'Hello' });
});

app.listen(PORT, () => {
  console.log(
    `Application is running on http://localhost:${PORT}`.blue.underline
  );
});
