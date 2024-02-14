// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let guesserQuestions =[];

// Use body-parser to parse the data from forms
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views folder
app.set('views', __dirname + '/views');

// Serve static files from the public folder
app.use(express.static(__dirname));

const allQuestions = [
    "coffee or tea?",
    "favorite food: pizza?",
    "enjoys reading?",
    "traveled abroad?",
    "favorite color: blue?",
    "enjoys watching movies?",
    "gone skydiving?",
    "favorite dessert: chocolate?",
    "enjoys hiking?",
    "been scuba diving?",
    "favorite season: winter?",
    "enjoys listening to music?",
    "been to a concert?",
    "favorite animal: dog?",
    "enjoys cooking?",
    "climbed a mountain?",
    "favorite hobby: painting?",
    "enjoys going to the beach?",
    "ridden a horse?",
    "favorite book genre: fantasy?",
    "enjoys playing sports?",
    "been to a theme park?",
    "favorite movie genre: comedy?",
    "likes attending parties?",
    "been camping?",
    "favorite season: summer?",
    "enjoys gardening?",
    "been to a music festival?",
    "favorite food: Italian?",
    "likes dancing?",
    "visited a museum?",
    "favorite drink: soda?",
    "enjoys playing video games?",
    "bungee jumped?",
    "favorite music genre: rock?",
    "likes photography?",
    "tried sushi?",
    "favorite holiday: Halloween?",
    "enjoys shopping?",
    "ridden a roller coaster?",
    "favorite TV show genre: drama?",
    "likes traveling by train?",
    "gone kayaking?",
    "favorite sport: soccer?",
    "enjoys stargazing?",
    "gone zip-lining?",
    "favorite dessert: ice cream?",
    "likes attending concerts?",
    "gone snorkeling?",
    "favorite music genre: classical?"
];

// Render the home page
app.get('/', (req, res) => {
    res.render('home');
});

// Render the quiz page
app.post('/quiz', (req, res) => {
    const name = req.body.name;
    const numQuestions = parseInt(req.body.numQuestions);
    const questions = generateRandomQuestions(numQuestions);
    guesserQuestions = questions;
    res.render('quiz', { name: name, questions: questions });
});


// Submit correct answers and redirect to the guesser submission page
let ownerAnswers = []; // Variable to store owner's answers

app.post('/submit-correct-answers', (req, res) => {
    ownerAnswers = req.body.userAnswers; // Store owner's answers
    // Optionally, you can store ownerAnswers in a database here
    res.redirect('/guesser-submission'); // Redirect to guesser submission page
});



// Render the guesser submission page
app.get('/guesser-submission', (req, res) => {
    // Retrieve questions from wherever they are stored (e.g., database, session)
    const questions = guesserQuestions; // Just an example, replace with actual retrieval
    res.render('guesser-submission', { questions: questions });
});

// Submit guesser's answers
//app.post('/submit-guesser-answers', (req, res) => {
    //const nickname = req.body.nickname;
    //const answers = req.body.answers;
    // Store the guesser's answers (e.g., in a database or array)
    // For now, let's just log them
    //console.log('Guesser:', nickname, 'Answers:', answers);
    // Redirect to a thank you page or any other page as needed
    //res.redirect('/result');
//});

// Handle submission of user answers and calculate score
app.post('/submit-guesser-answers', (req, res) => {


    const userAnswers = req.body.guesserAnswers;
    let score = 0;
    const nickname = req.body.nickname;
    // Store the guesser's answers (e.g., in a database or array)
    // For now, let's just log them
    // Compare user's answers with correct answers
    console.log(userAnswers);
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === ownerAnswers[i]) {
            score++;
        }
    }

    // Render the result page with the score and correct answers
    res.render('result', { score: score, totalQuestions: ownerAnswers.length, correctAnswers: ownerAnswers, questions: guesserQuestions});
});

// Render the answer submission page
app.get('/answer', (req, res) => {
    // Retrieve the answered questions and answers
    const questions = req.query.questions ? JSON.parse(req.query.questions) : [];
    const answers = req.query.answers ? JSON.parse(req.query.answers) : [];
    res.render('answer', { questions: questions, answers: answers });
});

// Function to generate a specified number of random questions
function generateRandomQuestions(numQuestions) {
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, numQuestions);
}

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});
