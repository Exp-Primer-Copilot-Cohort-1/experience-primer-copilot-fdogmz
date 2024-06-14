// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const comments = require('./comments');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments.getComments());
});

app.post('/comments', (req, res) => {
  const { text } = req.body;
  comments.addComment(text);
  res.json(comments.getComments());
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});