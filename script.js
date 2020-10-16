//VARIABLE DECLARATION
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const questionContainerEl = document.getElementById('questions-container');
const header1 = document.querySelector('h1');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const showScore = document.getElementById('score');
const scoreBoxEl = document.getElementById('score-box');
const scoreButtonEl = document.getElementById('enter-score');
const nameInput = document.querySelector('user-name-input');
const scoreInput = document.querySelector('user-score-input');
const nameSpan = document.querySelector('user-name');
const scoreSpan = document.querySelector('user-score');

//Global
var timerInterval;
var userName;
var userScore;

//NEED NOTES 
let shuffledQuestions, currentQuestionIndex


//NEED NOTES
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})



//NEED TO ADD LOCAL STORAGE TO SCORE AFTER WE GRAB INITIALS AND SCORE DATA
//declaring the variable that stores in global memory the various quiz questions


//declaring the variable of score that will increment as the user gains correct answers
let score = 0;

var secondsLeft = 60;


//NEED NOTES
function startGame () {
    
    startButton.classList.add('hide'); //THIS DIDNT WORK
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    header1.classList.add('hide');
    score = 0;
    setNextQuestion();
    setTime();
}

//TIMER FUNCTION
function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "Time remaining: " + secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      timesUp();
    }
  }, 1000);
}

//NEED NOTES
function timesUp () {
    timerEl.textContent = "Time's Up!!"
    startButton.textContent = "Restart";
    startButton.classList.remove('hide');
    header1.classList.remove('hide');
    header1.textContent = "Try Again?";
    scoreBoxEl.classList.remove('hide');
}


//NEED NOTES
function setNextQuestion (){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//NEED NOTES
function showQuestion(question) {
    questionEl.textContent = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button);
    })
}

//this will reset the answers each time we run the setNextQuestion function
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}


//NEED NOTES
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusclass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusclass(button, button.dataset.correct);
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.textContent = "Restart";
        startButton.classList.remove('hide');
        header1.classList.remove('hide');
        header1.textContent = "Try Again?";
        scoreBoxEl.classList.remove('hide');
        clearInterval(timerInterval);
    } 
    if (selectedButton.dataset = correct) {
        score++;
    } else { 
        secondsLeft-- * 10;
    }
    showScore.textContent = "Your Score: " + score + "/10";
}


//CAN ADD STYLING TO CSS TO GENERATE COLORS IN BUTTONS IF CORRECT OR WRONG, CONSIDER ADDING TO CSS TO GENERATE
function setStatusclass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}


//NEED NOTES
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// create user object from submission
 

 
  


scoreButtonEl.addEventListener('click', function(e) {
     e.preventDefault();

      var user = {
    userName: nameInput.value.trim(),
    userScore: scoreInput.value.trim(),
  };
    console.log(secondsLeft);
    // set new submission
    localStorage.setItem("user", JSON.stringify(user));
    
    // get most recent submission
    var lastUser = JSON.parse(localStorage.getItem("user"));
    nameSpan.textContent = lastUser.userName;
    scoreSpan.textContent = lastUser.userScore;
})


//NEED NOTES
const questions = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: [
            {text: "<script>", correct: true},
            {text: "<javascript>", correct: false},
            {text: "<scripted>", correct: false},
            {text: "<js>", correct: false},
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            {text: "<lbreak>", correct: false},
            {text: "<break>", correct: false},
            {text: "<br>", correct: true},
            {text: "<lb>", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers:  [
            {text: "Colorful Style Sheets", correct: false},
            {text: "Creative Style Sheets", correct: false},
            {text: "Computer Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
        ]
    },
    {
        question: "Which of the following is the correct syntax to display 'Coding is fun!' in an alert box using JavaScript?",
        answers: [
            {text: "confirm('Coding is Fun!')", correct: false},
            {text: "alert('Coding is Fun!)", correct: true},
            {text: "msg('Coding is Fun!)", correct: false},
            {text: "prompt('Coding is Fun!')", correct: false},
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        answers: [
            {text:"<script src='script.js'></script>", correct: true},
            {text: "<script href='script.js'></script>", correct: false},
            {text: "<script ref='script.js'></script>", correct: false},
            {text: "<script name='script.js'></script>", correct: false},
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyperlinks and Text Markup Language", correct: false},
            {text: "Home Tool Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            ]
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        answers: [
            {text: "The <head> section", correct: true},
            {text: "At the end of the document", correct: false},
            {text: "The <body> section", correct: false},
        ]
    },
    {
        question: "The external JavaScript file must contain <script> tag. True or False?",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
        ]
         
    },
    {
        question: "Which is the correct CSS syntax?",
        answers: [
            {text: "{body;color;black;}", correct: false},
            {text: "body:color=black", correct: false},
            {text: "body {color;black}", correct: true},
            {text: "{body:color=black}", correct: false},
        ]
    },
    {
        question: "How can you make a bulleted list?",
        answers: [
            {text: "<dl>", correct: false},
            {text: "<list>", correct: false},
            {text: "<ol>", correct: false},
            {text: "<ul>", correct: true},
        ]
    },
]