//VARIABLE DECLARATION
const startButton = document.getElementById('start-btn');
const questionContainerEl = document.getElementById('questions-container');
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);

//declaring the variable that stores in global memory the various quiz questions


//declaring the variable of score that will increment as the user gains correct answers
var score = 0;


function startGame () {
    console.log('started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion (){
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

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

function selectAnswer () {

}

const questions = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: [
          { text: "<script>", correct: true},
          { text: "<javascript>", correct: false},
          { text: "<scripted>", correct: false},
          { text: "<js>", correct: false},
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            {text: "<br>", correct: true},
            {text: "<break>", correct: false},
            {text: "<lbreak>", correct: false},
            {text: "<lb>", correct: false},
        ]
    }
    // {
    //     question: "What does CSS stand for?\n(a) Colorful Style Sheets\n(b) Creative Style Sheets\n(c) Computer Style Sheets\n(d) Cascading Style Sheets",
    //     answer: "d"
    // },
    // {
    //     prompt: "Which of the following is the correct syntax to display 'Coding is fun!' in an alert box using JavaScript?\n(a) confirm('Coding is Fun!')\n(b) msg('Coding is Fun!)\n(c) prompt('Coding is Fun!')\n(d) alert('Coding is Fun!)",
    //     answer: "d"  
    // },
    // {
    //     prompt: "What is the correct syntax for referring to an external script called 'geek.js'?\n(a) <script src='geek.js'>\n(b) <script href='geek.js'\n(c) <script ref='geek.js'>\n(d) <script name='geek.js'>",
    //     answer: "a"
    // },
    // {
    //     prompt: "What does HTML stand for?\n(a) Hyperlinks and Text Markup Language\n(b) Home Tool Markup Language\n(c) Hyper Text Markup Language",
    //     answer: "c"
    // },
    // {
    //     prompt: "Where in an HTML document is the correct place to refer to an external style sheet?\n(a) The <head> section\n(b) At the end of the document\n(c) The <body> section",
    //     answer: "a"
    // },
    // {
    //     prompt: "The external JavaScript file must contain <script> tag. True or False?\n(a) True\n(b) False",
    //     answer: "b"
    // },
    // {
    //     prompt: "Which is the correct CSS syntax?\n(a) {body;color;black;}\n(b) body:color=black\n(c) body {color;black}\n(d) {body:color=black}",
    //     answer: "c"
    // },
    // {
    //     prompt: "How can you make a bulleted list?\n(a) <dl>\n(b) <list>\n(c) <ol>\n(d) <ul>",
    //     answer: "d"
    // },
]