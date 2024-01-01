import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(helmet());

app.use('/', (req, res) => {
  res.json({ key: 'Hello' });
});
app.listen(PORT);
