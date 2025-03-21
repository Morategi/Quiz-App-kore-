const question = document.getElementById('question');
const choices = Array.from (document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const timerText = document.getElementById("timer");
console.log(timerText);


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [JSON];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
    
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(loadedQuestions => {
        
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            console.log(answerChoices);
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        game.classList.remove('hidden');
        loader.classList.add('hidden');
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
    
// CONSTANTS 

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions =[...questions]
    console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}

let timer;
const TIME_LIMIT =60;
let timeLeft = TIME_LIMIT;

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //navigate to te end 
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText =  `Question${questionCounter}/${MAX_QUESTIONS}`;
    // Updating the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers =  true;

    // Reset Timer
    clearInterval(timer);
    timeLeft = TIME_LIMIT;
    timerText.innerText = `Time: ${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        console.log("Time left:", timeLeft);
        timerText.innerText = `Time: ${timeLeft}s`;
       

        if (timeLeft <= 0) {
            clearInterval(timer);
            getNewQuestion();  // Moves to next question automatically
        }
    }, 1000);
};


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
       

      

        // like your if statement to check if its correct
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; 
        
       

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

         selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

      
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

startGame()
