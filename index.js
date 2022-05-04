import express from 'express';
const app = express();
const port = 3000;
import fs from 'fs';
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Normally routes would be in their separate folder, leaving here for ease of explanation

// CREATE
app.post('/issues/create', (req, res) => {
  //1. bringing in the current issues data from our "db"
  const issuesData = JSON.parse(fs.readFileSync('./data.json'));

  //2. getting the title and description from the body of the request
  const issueTitle = req.body.title;
  const issueDescription = req.body.description;
  //3. Setting the ID to be the current length of the issues array + 1
  const issueId = issuesData.length + 1;

  //4. create an object newIssue which contains the data from the body
  const newIssue = {
    id: issueId,
    title: issueTitle,
    description: issueDescription,
  };

  //5. pushing the new issue onto the issuesData array that is in memory
  issuesData.push(newIssue);

  //6. Writing the entire issuesData array from memory to the file (overwriting existing)
  fs.writeFileSync('./data.json', JSON.stringify(issuesData, null, 2));

  //7. sending the newIssue as the response
  res.send(newIssue);
});

// READ
// Return all issues (returned as an array)
app.get('/issues', (req, res) => {
  //1. bringing in the current issues data from our "db"
  const issuesData = JSON.parse(fs.readFileSync('./data.json'));
  //2. send issuesData
  res.send(issuesData);
});

// Return single issue based on req param of id
app.get('/issues/:id', (req, res) => {
  //1. bringing in the current issues data from our "db"
  const issuesData = JSON.parse(fs.readFileSync('./data.json'));
  // 2. get requested id from params
  //issue ids are being stored as ints, hence parsing int
  const requestedId = parseInt(req.params.id);
  // 3. find the issue that matches the id
  const issue = issuesData.find((issue) => issue.id === requestedId);
  // 4. return the issue
  res.send(issue);
});

// UPDATE
app.patch('/issues/:id/update', (req, res) => {
  //1. bringing in the current issues data from our "db"
  const issuesData = JSON.parse(fs.readFileSync('./data.json'));

  // 2. get requested id from params
  //issue ids are being stored as ints, hence parsing int
  const requestedId = parseInt(req.params.id);

  //3. getting the title and description from the body of the request
  const issueTitle = req.body.title;
  const issueDescription = req.body.description;

  // 4. find the index of the object in the array that matches the id
  const issueIndex = issuesData.findIndex((issue) => issue.id === requestedId);

  // 5. updating the data if it exists in the body
  if (issueTitle) {
    issuesData[issueIndex].title = issueTitle;
  }

  if (issueDescription) {
    issuesData[issueIndex].description = issueDescription;
  }

  //6. Writing the entire issuesData array from memory to the file (overwriting existing)
  fs.writeFileSync('./data.json', JSON.stringify(issuesData, null, 2));

  // 5. return the issue
  res.send(issuesData[issueIndex]);
});

// DELETE

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
