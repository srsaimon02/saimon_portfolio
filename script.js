
function randomColour(){
    const char = "0123456789ABCDEF";
    let colour = "#";

    for(let i = 0; i < 6; i++){
        const randomIndex = Math.floor(Math.random() * 16);
        colour = colour + char[randomIndex];
    }
return colour;   
}

function generatePalette(){
    const palette = document.querySelector("#palette");
    const PALETTE_SIZE = 5;

    palette.innerHTML = "";

    for(let i = 0; i < PALETTE_SIZEs; i++) {
        const colour = randomColour();

        const swatch = document.createElement("button");
        swatch.classList.add("swatch");
        swatch.style.backgroundColor = colour;
        swatch.textContent = colour;


        swatch.addEventListener("click", function(){
            navigator.clipboard.writeText(colour);
            swatch.textContent = "Copied!";

            setTimeout(function(){
                swatch.textContent = colour;
            }, 1000);
        });
        palette.appendChild(swatch);
    }

}



const generateBtn = document.querySelector("#generate-btn");
generateBtn.addEventListener("click", generatePalette);


const quizQuestions = [
    {
        text : "What does HTML stand for?",
        options : ["Hyper Text Markup Language", "High Tech Modern Look", "Hello To My Lamb"],
        correctAnswer : 0
    },
    {
        text : "What does CSS stand for?",
        options : ["Cool Style Sheets", "Cascading Style Sheets", "Cray Shee Shee"],
        correctAnswer : 1
    },
    {
        text : "What does JS stand for?",
        options : ["Jail style", "Jong Song", "JavaScript"],
        correctAnswer : 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizQuestionEl = document.querySelector("#quiz-question");
const quizProgressEl = document.querySelector("#quiz-progress");
const quizScoreEl = document.querySelector("#quiz-score");
const quizOptionsEl = document.querySelector("#quiz-options");

function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];

    quizQuestionEl.textContent = question.text;
    quizProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    quizScoreEl.textContent = `Score: ${score}`;

    quizOptionsEl.innerHTML = "";
    
    for (let i = 0; i < question.options.length; i++) {
        const optBtn = document.createElement("button");
        optBtn.textContent = question.options[i];

        optBtn.addEventListener("click", function(){
            handleAnswer(i);
        });


        quizOptionsEl.appendChild(optBtn)
    }
}

function handleAnswer(selectedIndex){

    const question = quizQuestions[currentQuestionIndex];
    if (selectedIndex === question.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    }
    else {
        showFinalScore();
    }

}

    function showFinalScore() {
        quizProgressEl.textContent = "Quiz Completed!";
        quizOptionsEl.innerHTML = "";
        quizScoreEl.textContent = `Final score: ${score} out of ${quizQuestions.length}`;
        /* add reset quiz + shuffle at restart */

    }

showQuestion();

