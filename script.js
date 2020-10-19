//VARIABLE DECLARATIONS TO STORE IN GLOBAL MEMORY
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const questionContainerEl = document.getElementById('questions-container');
const header1 = document.querySelector('h1');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const showScore = document.getElementById('score');
const scoreBoxEl = document.getElementById('score-box');
const nameInput = document.getElementById('user-name-input');
const scoreCardEl = document.getElementById('high-score-card');
const msgDiv = document.getElementById("msg");
const scoreButtonEl = document.getElementById('enter-score');
const highscoreDisplayName = document.getElementById('user-name');
const highscoreDisplayScore = document.getElementById('user-score');

//Global declarations of variables that will be used for functions later on
var timerInterval;


//declares variables of the shuffled questions and the index of the current question notated in global memory for use later on
let shuffledQuestions, currentQuestionIndex


//event handlers for the 'start' and 'next' buttons to run various functions found within the event handlers
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})

//declaring the variable of score that will increment as the user gains correct answers, starting at 0
let score = 0;

//declaring variable of secondsLeft to notate the total seconds remaining in the game, starting at 120
var secondsLeft = 120;


//runs the following code block when the 'start' button is pressed, and runs various functions found within code block
function startGame () {
    
    //hides the 'start' button for duration of game
    startButton.classList.add('hide'); 

    //shuffles through the questions array with a math.random method
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    //removes/adds 'hide' class to various elements
    questionContainerEl.classList.remove('hide');
    header1.classList.add('hide');
    scoreBoxEl.classList.add('hide');
    score = 0;
    secondsLeft = 120;
    setNextQuestion();
    setTime();
}

//runs the following code block to begin the timer on the page, and stops the timer when the interval hits 0, and runs functions within code block
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

//runs the following code block to notate when the timer hits 0, notates a new header text, along with rassigning the text of the start button to 'restart'
function timesUp () {
    timerEl.textContent = "Time's Up!!"
    startButton.textContent = "Restart";
    startButton.classList.remove('hide');
    header1.classList.remove('hide');
    header1.textContent = "Try Again?";
    scoreBoxEl.classList.remove('hide');
}


//runs code block of following functions to shuffle through the next question in the questions array
function setNextQuestion (){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//runs the following code block to remove the hide class to the questions and answers to be chosen by user
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


//runs code block when an answer button is selected, following function will occur
function selectAnswer(e) {
    //pulls from the data set of questions to determine whether or not the answer selected has a boolean value of true
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusclass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusclass(button, button.dataset.correct);
    })

    //will continue to randomize the questions in the below array until entire array has been exhausted 
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
        secondsLeft -= 5;
    }
    showScore.textContent = "Your Score: " + score + "/10";
}


//adds styling to answer buttons to notate correct and wrong answers based on a color change
function setStatusclass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}


//clears the color change on buttons when next button is pushed to generate next question
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


//notates user to enter correct values if initial input is incorrect
function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//Stores the user's name and score in the score card and saves it to local storage
scoreButtonEl.addEventListener('click', function(e) {
    e.preventDefault();
     
    if (nameInput.value === "") {
    displayMessage("error", "Initials cannot be blank");
    return false;
    }  else {
        var userSavedScores = JSON.parse(localStorage.getItem("userSavedScores")) || [];
        var currentUser = nameInput.value.trim();

        var currentScore = {
            name: currentUser,
            score: secondsLeft,
        };

    userSavedScores.push(currentScore);
    localStorage.setItem("userSavedScores", JSON.stringify(userSavedScores));
    generateHighScores();
    }
    scoreCardEl.classList.remove('hide');
 });
    

//creating loop to generate scores and have them append to the <ul>
function generateHighScores() {
    highscoreDisplayName.innterHTML = "";
    highscoreDisplayScore.innerHTML = "";

    var highScores = JSON.parse(localStorage.getItem("userSavedScores")) || [];

    for (var i = 0; i < highScores.length; i++) {
        var nameSpan = document.createElement("li");
        var scoreSpan = document.createElement("li");
        nameSpan.textContent = highScores[i].name;
        scoreSpan.textContent = highScores[i].score;
        highscoreDisplayName.appendChild(nameSpan);
        highscoreDisplayScore.appendChild(scoreSpan);
    

}};

//Declares the variable arrays of the questions to be randomized in above functions 
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