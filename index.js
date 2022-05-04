import express from 'express';
const app = express();
const port = 3000;
import { data } from './data.js';

app.get('/', (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
