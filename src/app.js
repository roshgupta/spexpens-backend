import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', (req, res) => {
  res.json({ key: 'Hello' });
});
app.listen(PORT);
