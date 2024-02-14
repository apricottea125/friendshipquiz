// Require the modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an express app
const app = express();

// Use body-parser to parse the data from forms
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Define the routes
app.get('/', (req, res) => {
  // Render the home page
  res.render('home');
});

app.get('/rules', (req, res) => {
  // Render the rules page
  res.render('rules');
});

app.post('/quiz', (req, res) => {
  // Get the data from the form
  const name = req.body.name;
  const questions = req.body.questions;

  // Create a quiz object with the name and questions
  const quiz = {
    name: name,
    questions: questions
  };

  // Render the quiz page with the quiz object
  res.render('quiz', { quiz: quiz });
});

