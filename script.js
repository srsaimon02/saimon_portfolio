
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

    for(let i = 0; i < PALETTE_SIZE; i++) {
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


const quizQuestions = [ /* Try to make it that the quiz app updates itself automatically by generating a random set of quiz
                        based the latest real world events */
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

// -- SORTING VISUALISER --

const sortBarsEl = document.querySelector("#sort-bars");
const generateArrayBtn = document.querySelector("#generate-array-btn");
const sortBtn = document.querySelector("#sort-btn");
const bubbleSortBtn = document.querySelector("#bubble-sort");
const selectionSortButton = document.querySelector("#selection-sort");
const speedSlider = document.querySelector("#speed-slider");
const speedValueEl = document.querySelector("#speed-value");
let sortArray = [];
let isSorting = false;
let sortMethod = "BubbleSort";
let sortSpeed = 50;

function generateArray(){
    if (isSorting) return;

    sortArray = [];

    for (let i=0; i < 20; i++) {
        const randomValue = Math.floor(Math.random() * 100) + 1;
        sortArray.push(randomValue);
    }

    displayBars();
}

function displayBars(){
    sortBarsEl.innerHTML = "";

    for (let i=0; i < sortArray.length; i++){
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${sortArray[i]}%`;
        sortBarsEl.appendChild(bar); //user should be able to move the bars around themselves to reshuffle how they like
    }
}


async function animatedBubbleSort() {
if (isSorting) return;
isSorting = true;

    const n = sortArray.length;

    for (let i = 0; i < n -1; i++) {
        for (let j = 0; j < n - 1 - i; j++){
            if (sortArray[j] > sortArray[j +1]) {
                const temp = sortArray[j];
                sortArray[j] = sortArray[j+1];
                sortArray[j+1] = temp;

                displayBars();
                await sleep(sortSpeed); 
            }
        }
    }

    isSorting = false;
}


 async function animatedSelectionSort(){

    if (isSorting) return;
    isSorting = true;

    const n = sortArray.length;


    for ( let i = 0; i < n-1; i++){
        let minIndex = i;
        for (let j = i+1; j < n ; j++){
            if (sortArray[j] < sortArray[minIndex]) {
                minIndex = j;
            }
        }
        const temp = sortArray[i];
        sortArray[i] = sortArray[minIndex];
        sortArray[minIndex] = temp;
        displayBars();
        await sleep(sortSpeed);

    }

    isSorting = false;


}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


bubbleSortBtn.addEventListener("click", function(){
    sortMethod = "BubbleSort";
    bubbleSortBtn.classList.add("active");
    selectionSortButton.classList.remove("active");
});
  
selectionSortButton.addEventListener("click", function(){
    sortMethod = "SelectionSort";
    selectionSortButton.classList.add("active");
    bubbleSortBtn.classList.remove("active");
});


sortBtn.addEventListener("click", function(){
    if(sortMethod === "BubbleSort"){
        animatedBubbleSort();
    }
    else if(sortMethod === "SelectionSort"){
        animatedSelectionSort();
    }
});

speedSlider.addEventListener("input", function(){
    sortSpeed = Number(speedSlider.value);
    speedValueEl.textContent = `${sortSpeed}ms`;

});

generateArrayBtn.addEventListener("click", generateArray);

generateArray();








