// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up the body-parser middleware
app.use(bodyParser.json());

// Read the comments from the file
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  res.json(comment);
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment
  };
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');

  comment.name = req.body.name;
  comment.comment = req.body.comment;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');

  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000...'));