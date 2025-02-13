// Quiz class
var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
    // Display the current question
    Quiz.prototype.displayQuestion = function () {
        var _this = this;
        var questionElement = document.getElementById("question");
        var choicesElement = document.getElementById("choices");
        if (questionElement && choicesElement) {
            // Display the question
            questionElement.textContent = this.questions[this.currentQuestionIndex].question;
            // Clear previous choices
            choicesElement.innerHTML = "";
            // Display answer choices as buttons
            this.questions[this.currentQuestionIndex].choices.forEach(function (choice) {
                var button = document.createElement("button");
                button.textContent = choice;
                button.addEventListener("click", function () { return _this.checkAnswer(choice); });
                choicesElement.appendChild(button);
            });
        }
    };
    // Check if the selected answer is correct
    Quiz.prototype.checkAnswer = function (selectedAnswer) {
        var nextButton = document.getElementById("next-button");
        if (selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
            this.score++;
        }
        // Enable the "Next Question" button
        if (nextButton) {
            nextButton.disabled = false;
        }
    };
    // Move to the next question
    Quiz.prototype.nextQuestion = function () {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        }
        else {
            this.showScore();
        }
        // Disable the "Next Question" button until an answer is selected
        var nextButton = document.getElementById("next-button");
        if (nextButton) {
            nextButton.disabled = true;
        }
    };
    // Display the final score
    Quiz.prototype.showScore = function () {
        var questionElement = document.getElementById("question");
        var choicesElement = document.getElementById("choices");
        var nextButton = document.getElementById("next-button");
        var scoreElement = document.getElementById("score");
        if (questionElement && choicesElement && nextButton && scoreElement) {
            questionElement.textContent = "Quiz Over!";
            choicesElement.innerHTML = "";
            nextButton.style.display = "none";
            scoreElement.textContent = "Your score: ".concat(this.score, " out of ").concat(this.questions.length);
        }
    };
    return Quiz;
}());
// Sample questions
var questions = [
    {
        question: "What is color of apple?",
        choices: ["Pink", "White", "Blue", "Red"],
        correctAnswer: "Red"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "4"
    }
];
// Initialize the quiz
var quiz = new Quiz(questions);
// Display the first question
quiz.displayQuestion();
// Add event listener for the "Next Question" button
var nextButton = document.getElementById("next-button");
if (nextButton) {
    nextButton.addEventListener("click", function () { return quiz.nextQuestion(); });
}
