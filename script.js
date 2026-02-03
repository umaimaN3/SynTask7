document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const reviewBtn = document.getElementById('review-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const scoreDisplay = document.getElementById('score-display');
    const progressBar = document.getElementById('progress-bar');
    const finalScoreText = document.getElementById('final-score-text');
    const totalQuestionsText = document.getElementById('total-questions-text');
    const correctCount = document.getElementById('correct-count');
    const incorrectCount = document.getElementById('incorrect-count');
    const percentage = document.getElementById('percentage');
    const resultMessage = document.getElementById('result-message');
    const scoreCircleProgress = document.getElementById('score-circle-progress');

    // Quiz Data
    const quizData = [
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: 3
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Colorful Style Sheets"
            ],
            answer: 1
        },
        {
            question: "Which HTML tag is used for the largest heading?",
            options: ["<h6>", "<heading>", "<h1>", "<head>"],
            answer: 2
        },
        {
            question: "What does API stand for?",
            options: [
                "Application Programming Interface",
                "Advanced Programming Interface",
                "Application Process Integration",
                "Automated Programming Interface"
            ],
            answer: 0
        },
        {
            question: "Which of these is a JavaScript framework?",
            options: ["Django", "Flask", "React", "Spring"],
            answer: 2
        },
        {
            question: "What does DOM stand for in JavaScript?",
            options: [
                "Document Object Model",
                "Digital Object Management",
                "Display Object Model",
                "Document Orientation Mode"
            ],
            answer: 0
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: ["//", "/*", "#", "--"],
            answer: 0
        },
        {
            question: "What is the purpose of CSS media queries?",
            options: [
                "To query databases",
                "To create responsive designs",
                "To manipulate DOM elements",
                "To define JavaScript functions"
            ],
            answer: 1
        },
        {
            question: "Which method converts JSON string to JavaScript object?",
            options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
            answer: 0
        },
        {
            question: "What is the result of 2 + '2' in JavaScript?",
            options: ["4", "22", "NaN", "Error"],
            answer: 1
        }
    ];

    // Quiz State Variables
    let currentQuestion = 0;
    let score = 0;
    let userAnswers = new Array(quizData.length).fill(null);
    let quizCompleted = false;

    // Initialize the Quiz
    function initQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers.fill(null);
        quizCompleted = false;
        updateScoreDisplay();
        showScreen(startScreen);
    }

    // Screen Management
    function showScreen(screen) {
        [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // Load Question
    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionText.textContent = question.question;
        questionCounter.textContent = `Question: ${currentQuestion + 1}/${quizData.length}`;
        
        // Update progress bar
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (userAnswers[currentQuestion] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.innerHTML = `
                <span class="option-number">${index + 1}.</span>
                <span class="option-text">${option}</span>
            `;
            
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update button states
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = currentQuestion === quizData.length - 1;
        submitBtn.style.display = currentQuestion === quizData.length - 1 ? 'flex' : 'none';
        nextBtn.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'flex';
    }

    // Select Option
    function selectOption(optionIndex) {
        // Remove selection from all options
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        event.target.closest('.option').classList.add('selected');
        
        // Store user's answer
        userAnswers[currentQuestion] = optionIndex;
        
        // Update score if reviewing completed quiz
        if (quizCompleted) {
            updateScore();
        }
    }

    // Navigate to Next Question
    function nextQuestion() {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion();
        }
    }

    // Navigate to Previous Question
    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    }

    // Update Score Display
    function updateScoreDisplay() {
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // Calculate Score
    function calculateScore() {
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizData[index].answer) {
                score++;
            }
        });
    }

    // Update Score
    function updateScore() {
        calculateScore();
        updateScoreDisplay();
    }

    // Show Results
    function showResults() {
        calculateScore();
        
        // Update result screen elements
        finalScoreText.textContent = score;
        totalQuestionsText.textContent = quizData.length;
        correctCount.textContent = score;
        incorrectCount.textContent = quizData.length - score;
        
        const scorePercentage = Math.round((score / quizData.length) * 100);
        percentage.textContent = scorePercentage;
        
        // Set result message based on score
        if (scorePercentage === 100) {
            resultMessage.textContent = "🎉 Excellent! Perfect score! You're a genius!";
            resultMessage.style.color = "#4CAF50";
        } else if (scorePercentage >= 80) {
            resultMessage.textContent = "👍 Great job! You know your stuff!";
            resultMessage.style.color = "#2196F3";
        } else if (scorePercentage >= 60) {
            resultMessage.textContent = "😊 Good effort! Keep learning!";
            resultMessage.style.color = "#FF9800";
        } else {
            resultMessage.textContent = "📚 Keep practicing! You'll do better next time!";
            resultMessage.style.color = "#F44336";
        }
        
        // Animate progress circle
        const circleCircumference = 2 * Math.PI * 65;
        const offset = circleCircumference - (scorePercentage / 100) * circleCircumference;
        scoreCircleProgress.style.strokeDashoffset = offset;
        
        quizCompleted = true;
        showScreen(resultScreen);
    }

    // Review Answers
    function reviewAnswers() {
        currentQuestion = 0;
        quizCompleted = true;
        loadQuestion();
        showScreen(quizScreen);
        
        // Mark correct/incorrect answers
        document.querySelectorAll('.option').forEach((option, index) => {
            if (index === quizData[currentQuestion].answer) {
                option.classList.add('correct');
            } else if (userAnswers[currentQuestion] === index && userAnswers[currentQuestion] !== quizData[currentQuestion].answer) {
                option.classList.add('incorrect');
            }
        });
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        showScreen(quizScreen);
        loadQuestion();
    });

    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', showResults);
    restartBtn.addEventListener('click', initQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!quizScreen.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                if (!prevBtn.disabled) prevQuestion();
                break;
            case 'ArrowRight':
                if (!nextBtn.disabled && !quizCompleted) nextQuestion();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(e.key) - 1;
                if (optionIndex < quizData[currentQuestion].options.length) {
                    selectOption(optionIndex);
                }
                break;
            case 'Enter':
                if (quizScreen.classList.contains('active') && !quizCompleted) {
                    if (currentQuestion === quizData.length - 1) {
                        showResults();
                    } else {
                        nextQuestion();
                    }
                }
                break;
        }
    });

    // Initialize the quiz
    initQuiz();
});