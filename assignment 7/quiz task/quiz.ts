
interface Question {
    question: string;
    choices: string[];
    correctAnswer: string;
}

class Quiz {
    private questions: Question[];
    private currentQuestionIndex: number;
    private score: number;

    constructor(questions: Question[]) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    displayQuestion(): void {
        const questionElement = document.getElementById("question");
        const choicesElement = document.getElementById("choices");

        if (questionElement && choicesElement) {
          
            questionElement.textContent = this.questions[this.currentQuestionIndex].question;
            choicesElement.innerHTML = "";

            
            this.questions[this.currentQuestionIndex].choices.forEach(choice => {
                const button = document.createElement("button");
                button.textContent = choice;
                button.addEventListener("click", () => this.checkAnswer(choice));
                choicesElement.appendChild(button);
            });
        }
    }

    checkAnswer(selectedAnswer: string): void {
        const nextButton = document.getElementById("next-button") as HTMLButtonElement | null;

        if (selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
            this.score++;
        }

        if (nextButton) {
            nextButton.disabled = false;
        }
    }

    nextQuestion(): void {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.showScore();
        }

        const nextButton = document.getElementById("next-button") as HTMLButtonElement | null;
        if (nextButton) {
            nextButton.disabled = true;
        }
    }

    showScore(): void {
        const questionElement = document.getElementById("question");
        const choicesElement = document.getElementById("choices");
        const nextButton = document.getElementById("next-button") as HTMLButtonElement | null;
        const scoreElement = document.getElementById("score");

        if (questionElement && choicesElement && nextButton && scoreElement) {
            questionElement.textContent = "Quiz Over!";
            choicesElement.innerHTML = "";
            nextButton.style.display = "none";
            scoreElement.textContent = `Your score: ${this.score} out of ${this.questions.length}`;
        }
    }
}

const questions: Question[] = [
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

const quiz = new Quiz(questions);

quiz.displayQuestion();


const nextButton = document.getElementById("next-button") as HTMLButtonElement | null;
if (nextButton) {
    nextButton.addEventListener("click", () => quiz.nextQuestion());
}