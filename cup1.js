const questions = [
    {
        question: "Which word best fits this definition:A sudden, intense feeling of fear or anxiety?",
        options: ["a) Panic", "b) Relief", "c) Joy", "d) Excitement"],
        correct: 0
    },
    {
        question: "Which of the following sentences correctly uses the past perfect continuous tense?",
        options: ["a) I had been studying for two hours when she called", "b) I have been studying for two hours when she called.", "c) I had studied for two hours when she called.", "d) I study for two hours when she called."],
        correct: 0
    },
    {
        question: "The more you have of me, the less you see. What am I'?",
        options: ["a) Light", "b) Darkness", "c) Smoke", "d) Fog"],
        correct: 1
    },
    {
        question: "Which of the following words means : to reject or refuse something with strong disapproval'?",
        options: ["a) Approve", "b) Condone", "c) Repudiate", "d) Endorse"],
        correct: 2
    },
    {
        question: "Choose the sentence that contains the correct use of a conditional:'?",
        options: ["a) If I will know the answer, I will tell you.", "b) If I knew the answer, I will tell you.", "c) If I know the answer, I would tell you.", "d) If I knew the answer, I would tell you."],
        correct: 3
    },
    {
        question: "I am not alive, but I grow; I don't have eyes, but you can see me; I can be destroyed, but I cannot be touched. What am I?",
        options: ["a) A shadow", "b) A thought", "c) A memory", "d) A flame"],
        correct: 1
    },
    {
        question: "Choose the word that means unable to be disturbed or moved'?",
        options: ["a) Agitated", "b) Unflappable", "c) Vulnerable", "d) Restless"],
        correct: 1
    },
    {
        question: "Which of the following sentences uses a gerund correctly'?",
        options: ["a) I enjoy to read books in my free time", "b) I enjoy reading books in my free time.", "c) I enjoy read books in my free time.", "d) I enjoy books reading in my free time."],
        correct: 1
    },
    {
        question: "I am light as a feather, yet the strongest man can't hold me for much longer than a minute. What am I?",
        options: ["a) Breath", "b) Water", "c) A thought", "d) A shadow"],
        correct: 0
    },
    {
        question: "If a unicorn and a penguin had a race to the moon, what would they use to power their spaceship? ?",
        options: ["a) A hamster on a wheel running at the speed of light", "b) A carrot-powered engine and snowflakes", "c) Moon cheese and stardust", "d) orange juice and penguin ice"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let timer;
const userAnswers = new Array(questions.length).fill(null);

function startCompetition() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];
    let html = `<div class="question"><h2>Question ${currentQuestionIndex + 1}</h2><p class="sub-question">${question.question}</p></div>`;
    html += '<ul class="options">';
    question.options.forEach((option, index) => {
        html += `<li onclick="selectAnswer(${index})">${option}</li>`;
    });
    html += '</ul>';
    questionContainer.innerHTML = html;
    document.getElementById('nextBtn').style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('submitBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    const options = document.querySelectorAll('.options li');
    options.forEach((option, index) => {
        if (index === questions[currentQuestionIndex].correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== questions[currentQuestionIndex].correct) {
            option.classList.add('incorrect');
        }
        option.onclick = null;
    });
    
}

function navigateQuestion(direction) {
    currentQuestionIndex += direction;
    loadQuestion();
}

function submitQuiz() {
    clearInterval(timer);
    const correctAnswersCount = userAnswers.filter((answer, index) => answer === questions[index].correct).length;
    document.getElementById('result').innerHTML = `You answered ${correctAnswersCount} out of ${questions.length} questions correctly.`;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    
}

function startTimer() {
    let timeInSeconds = 30 * 60; // 30 minutes in seconds
    const timerElement = document.getElementById('timer');

    timer = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;

        if (timeInSeconds === 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            timeInSeconds--;
        }
    }, 1000);
    
}