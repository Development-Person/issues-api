import express from 'express';
const app = express();
const port = 3000;
import { data } from './data.js';

// Normally routes would be in their separate folder, leaving here for ease of explanation
// Return all issues (returned as an array)
app.get('/', (req, res) => {
  res.send(data);
});

// Return single issue based on req param of id
app.get('/issue/:id', (req, res) => {
  // 1. get requested id from params
  //issue ids are being stored as ints, hence parsing int
  const requestedId = parseInt(req.params.id);
  // 2. find the issue that matches the id
  const issue = data.find((issue) => issue.id === requestedId);
  // 3. return the issue
  res.send(issue);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
