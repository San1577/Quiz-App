const questions = [
    {
        question: "Which is the largest planet in our solar system?",
        answer: [
            { text: "Earth", correct: false},
            { text: "Mars", correct: false},
            { text: "Jupiter", correct: true},
            { text: "Saturn", correct: false},
        ]
    },
    {
        question: "What is the square root of 144?",
        answer: [
            { text: "10", correct: false},
            { text: "11", correct: false},
            { text: "12", correct: true},
            { text: "13", correct: false},
        ]
    },
    {
        question: "Who was the first President of the United States?",
        answer: [
            { text: "George Washington", correct: true},
            { text: "Abraham Lincoln", correct: false},
            { text: "Thomas Jefferson", correct: false},
            { text: "John Adams", correct: false},
        ]
    },
    {
        question: "What does “HTML” stand for?",
        answer: [
            { text: "HyperText Markup Language", correct: true},
            { text: "High Tech Machine Learning", correct: false},
            { text: "Hyperlink Text Mainframe Language", correct: false},
            { text: "Home Tool Markup Language", correct: false},
        ]
    }
];

const question = document.querySelector('.quiz-app h3');
const answers = document.querySelector('.answer-list');
const nextBtn = document.querySelector('.nextBtn');
const quizApp = document.querySelector('.quiz-app');
const header = document.querySelector('.quiz-app h1');

let currentQuestionIndex = 0;
let score = 0;

const outlineHeight = 125 + header.offsetHeight + nextBtn.offsetHeight;

function startQuiz() {
    if (currentQuestionIndex >= questions.length) {
        resetState();
        showResult();
    } else {
        nextBtn.innerHTML = 'Next';
        showQuiz();
        nextBtn.style.visibility = 'hidden';
    }
}

function showQuiz() {
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let numberOfQuestion = currentQuestionIndex + 1;

    question.style.display = 'block';
    question.innerHTML = `Question ${numberOfQuestion}: ${currentQuestion.question}`;

    currentQuestion.answer.forEach(answer => {
        let answerBtn = document.createElement('button');
        answerBtn.innerHTML = answer.text;
        answers.appendChild(answerBtn);
        if (answer.correct) {
            answerBtn.dataset.correct = answer.correct;
        }
        answerBtn.addEventListener('click', selectAnswer);
    });
    let currentHeight = outlineHeight + answers.offsetHeight + question.offsetHeight;
    quizApp.style.height = `${currentHeight}px`;
    currentQuestionIndex ++;
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.style.background = '#66b74d';
        score++ ;
    } else {
        selectBtn.style.background = 'red';
    }
    Array.from(answers.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.background = '#66b74d';
        }
        button.disabled = true;
    });
    nextBtn.style.visibility = 'visible';
}

function resetState() {
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}

function showResult() {
    question.innerHTML = `Score: ${score} out of ${currentQuestionIndex}`;
    nextBtn.innerHTML = 'Play again';
    quizApp.style.height = `${outlineHeight}px`;
    resetStat();
}

function resetStat() {
    currentQuestionIndex = 0;
    score = 0;
}

quizApp.style.height = `${quizApp.offsetHeight}px`;

nextBtn.addEventListener('click', startQuiz);

