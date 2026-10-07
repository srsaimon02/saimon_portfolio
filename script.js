

// -- Randmon Paletted Genrator --
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


// -- QUIZ APP --

const quizQuestions = [ /* TODO: Try to make it that the quiz app updates itself automatically by generating a random set of quiz
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
        /* TODO: add reset quiz + shuffle at restart */

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
        sortBarsEl.appendChild(bar); //TODO: user should be able to move the bars around themselves to reshuffle how they like
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

// -- Binary Search Tree Visualiser --

/*
TODO: I Just wanna move on, so for future: 
- Instead of shrinking the lower nodes actually shrink the whole tree as it gets larger
- Extend the max height a lot more 
- Currently it stops inserting as soon as it any of the sides reaches the max depth but i 
want it so it will still insert to other branches just wont insert to the branch that reached maximum
- In fact I'll disable the both the shrinking and expansion of canvas only keep the limit
*/

const bstCanvasEl = document.querySelector("#bst-canvas");
const bstInputEl = document.querySelector("#bst-input");
const bstInsertBtn = document.querySelector("#bst-insert");
const bstSearchBtn = document.querySelector("#bst-search");
const bstRandomBtn = document.querySelector("#bst-random");
const bstClearBtn = document.querySelector("#bst-clear");
const bstStatusEl = document.querySelector("#bst-status");
const BST_TOP_MARGIN = 30;
const BST_LEVEL_HEIGHT = 70;
let bstRoot = null;
let bstHighlight = [];
let bstCurrent = null;

function insert(node, value) {
  if (node === null) {
    return { value: value, left: null, right: null };
  }

  if (value < node.value) {
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    node.right = insert(node.right, value);
  }

  return node;
}


function treeDepth(node) {
    if (node === null) return 0;
    return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}

function renderTree() { // TODO: Change it in the future, so that instead bstCanvasEl.innerHTML = "";, it draws the tree once and then toggle classes on existing nodes.
    bstCanvasEl.innerHTML = "";

    // EXPANDS THE CANVAS VERTICALLY AS THE TREE GROWS
    const depth = treeDepth(bstRoot); 
    const neededHeight = BST_TOP_MARGIN + depth * BST_LEVEL_HEIGHT + 40;
    bstCanvasEl.style.height = `${Math.max(340, neededHeight)}px`;

    drawNode(bstRoot, 50, 0, 25, null, null);
}


function drawNode(node, x, depth, offset, parentX, parentY) {
    if (node === null) return;

    const y = BST_TOP_MARGIN + depth * BST_LEVEL_HEIGHT;

    if (parentX !== null){
        drawEdge(parentX, parentY, x, y);
    }

    const nodeEl = document.createElement("div");
    nodeEl.classList.add("bst-node");
    if (bstHighlight.includes(node.value)) nodeEl.classList.add("highlight");
    if (node.value === bstCurrent) nodeEl.classList.add("current");

    nodeEl.textContent = node.value;
    nodeEl.style.left = `${x}%`;
    nodeEl.style.top = `${y}px`;
    // SHRINKS THE NODES AS THE TREE GROWS
    /*
    const size = Math.max(24, 42 - depth * 5); 
    nodeEl.style.width = `${size}px`;
    nodeEl.style.height = `${size}px`;
    nodeEl.style.fontSize = `${Math.max(10, 15 - depth)}px`;
    nodeEl.style.marginLeft = `${-size / 2}px`;
    */
    bstCanvasEl.appendChild(nodeEl);

    drawNode(node.left, x - offset, depth + 1, offset / 2, x, y);
    drawNode(node.right, x + offset, depth + 1, offset / 2, x, y);
    
}


function drawEdge(x1, y1, x2, y2){ // TODO: replace this using svg <line> elements
    const canvasWidth = bstCanvasEl.offsetWidth;

    const px1 = (x1/100) * canvasWidth;
    const px2 = (x2/100) * canvasWidth;

    const dx = px2 - px1;
    const dy = y2 - y1;

    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy,dx) * (180 / Math.PI);

    const edge = document.createElement("div");
    edge.classList.add("bst-edge");
    edge.style.left = `${px1}px`;
    edge.style.top = `${y1 + 21}px`;
    edge.style.width= `${length}px`;
    edge.style.transform = `rotate(${angle}deg)`;
    bstCanvasEl.appendChild(edge);
}

async function animatedSearch(target) {
    bstHighlight = [];
    let current = bstRoot;

    while (current !== null){
        bstHighlight.push(current.value);
        bstCurrent = current.value;
        renderTree();
        await sleep(600);
    

    if (current.value === target) {
        bstStatusEl.textContent = `Found ${target}`;
        return;
    }

    if (target < current.value) {
        current = current.left;
    } else {
        current = current.right;
    }
  }

  bstStatusEl.textContent = `${target} is not the tree.`
    
}


bstInsertBtn.addEventListener("click", function(){
    bstHighlight = [];
    const value = Number(bstInputEl.value);

    if (bstInputEl.value === ""){
        bstStatusEl.textContent = "Error: Enter a number first.";
        return;
    }

         if (treeDepth(bstRoot) >= 7) {
        bstStatusEl.textContent = "Error: Maximum numbder of node reach.";
        return;
    }

    bstRoot = insert(bstRoot, value);
    renderTree();
    bstStatusEl.textContent = `Inserted ${value}.`;
    bstInputEl.value = "";
});

bstClearBtn.addEventListener("click", function(){
    bstHighlight = [];
    bstRoot = null;
    renderTree();
    bstStatusEl.textContent = "Tree Cleared.";
});

bstRandomBtn.addEventListener("click", function(){
    bstHighlight = [];
    bstRoot = null;

    for (let i = 0; i < 7; i++){
        const randomValue = Math.floor(Math.random() * 99) + 1;
        bstRoot = insert(bstRoot, randomValue)
    }

    renderTree();
    bstStatusEl.textContent = "Generated a random tree."
});

bstSearchBtn.addEventListener("click", function() {
    if (bstInputEl.value === "") {
        bstStatusEl.textContent = "Error: Enter a number first."
        return;
    }

    const value = Number(bstInputEl.value);
    bstStatusEl.textContent = `Searching for ${value}...`;
    animatedSearch(value);
    bstInputEl.value = "";
})

bstRandomBtn.click();

// -- HASH TABLE EXPLORER --

const hashTableEl = document.querySelector("#hash-table");
const hashKeyEl = document.querySelector("#hash-key");
const hashAddBtn = document.querySelector("#hash-add");
const hashFindBtn = document.querySelector("#hash-find");
const hashClearBtn = document.querySelector("#hash-clear");
const hashStatusEl = document.querySelector("#hash-status");

const HASH_TABLE_SIZE = 10;

let hashTable = [];
let hashFound = null;

function hash(key, tableSize) {
    let total = 0;
    
    for (let i = 0; i < key.length; i++){
        total = total + key.charCodeAt(i);
    }

    return total % tableSize;
}

function createTable() {
    hashTable = []

    for (let i = 0; i < HASH_TABLE_SIZE; i++) {
    hashTable.push([]);
    }
}

function addKey(key) {
    const slot = hash(key, HASH_TABLE_SIZE);
    const bucket = hashTable[slot];

    if (bucket.includes(key)) {
        hashStatusEl.textContent = `"${key}" is already in slot ${slot}.`;
        return;
    }

    bucket.push(key);
    renderHashTable();

    if (bucket.length > 1) {
        hashStatusEl.textContent = `"${key}" hashed to slot ${slot} - collision! ${bucket.length} keys chained there.`;
    } else {
        hashStatusEl.textContent = `"${key}" hashed to slot ${slot}.`;
    }
}

function findKey(key) {
    const slot = hash(key, HASH_TABLE_SIZE);
    const bucket = hashTable[slot];

    let steps = 0;
    for (let i = 0; i < bucket.length; i++) {
        steps++;
        if (bucket[i] === key) {
            hashFound = key;
            renderHashTable();
            hashStatusEl.textContent = `Found "${key}" in slot ${slot} after ${steps} comparision${steps === 1 ? "" : "s"}.`;
            return;
        }
    }

    hashFound = null;
    renderHashTable();
    hashStatusEl.textContent = `"${key}" is not in the table. Checked slot ${slot}.`;
}

function renderHashTable(){
    hashTableEl.innerHTML = "";

    for (let i = 0; i < hashTable.length; i++) {
        const slotEl = document.createElement("div");
        slotEl.classList.add("hash-slot");

        const indexEl = document.createElement("div");
        indexEl.classList.add("slot-index");
        indexEl.textContent = i;
        slotEl.appendChild(indexEl);

        const itemsEl = document.createElement("div");
        itemsEl.classList.add("slot-items");

        for (let j = 0; j < hashTable[i].length; j++) {
            const entryEl = document.createElement("div");
            entryEl.classList.add("slot-entry");
            entryEl.textContent = hashTable[i][j];

            if (hashTable[i][j] === hashFound) {
                entryEl.classList.add("found");
            }
            itemsEl.appendChild(entryEl);
        }
        slotEl.appendChild(itemsEl);
        hashTableEl.appendChild(slotEl); 
        
    }
    
    
}

hashAddBtn.addEventListener("click", function(){
    const key = hashKeyEl.value.trim();

    if (key === "") {
        hashStatusEl.textContent = "Enter a word first."
        return;
    }

    hashFound = null;
    addKey(key);
    hashKeyEl.value = "";
});

hashFindBtn.addEventListener("click", function(){
    const key = hashKeyEl.value.trim();

    if (key === "") {
        hashStatusEl.textContent = "Enter a word first."
        return;
    }

    findKey(key);
    hashKeyEl.value = "";
});

hashClearBtn.addEventListener("click", function() {
    createTable();
    hashFound = null;
    renderHashTable();
    hashStatusEl.textContent = "Table Cleared."
});

createTable();
renderHashTable();

// -- PATHFINDING VISUALISER --

const gridEl = document.querySelector("#grid");
const findPathBtn = document.querySelector("#find-path");
const clearWallsBtn = document.querySelector("#clear-walls");
const resetGridBtn = document.querySelector("#reset-grid");
const gridStatusEl = document.querySelector("#grid-status");

const GRID_ROWS = 12;
const GRID_COLS = 24;

let grid = [];
let isDrawing = false;

function createGrid() {
    grid = []; 

    for (let row = 0; row < GRID_ROWS; row++) {
        const rowArray = [];

        for (let col = 0; col < GRID_COLS; col++) {
            rowArray.push("empty");
        }

        grid.push(rowArray);
    }

    grid[1][1] = "start";
    grid[GRID_ROWS - 2][GRID_COLS - 2] = "end";
}

function renderGrid(){
    gridEl.innerHTML = "";
    gridEl.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;

    for (let row = 0; row < GRID_ROWS; row++){
        for (let col = 0; col < GRID_COLS; col++){
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if(grid[row][col] !== "empty") {
                cell.classList.add(grid[row][col]);
            }

            cell.dataset.row = row;
            cell.dataset.col = col;

            gridEl.appendChild(cell);
        }
    }
}

function toggleWall(row, col) {
    const state = grid[row][col];

    if (state === "start" || state === "end") return;

    if (state === "wall") {
        grid[row][col] = "empty";
    } else {
        grid[row][col] = "wall";
    }

    renderGrid();
}

gridEl.addEventListener("mousedown", function(event) {
    const cell = event.target;

    if (!cell.classList.contains("cell")) return;

    isDrawing = true;
    toggleWall(Number(cell.dataset.row), Number(cell.dataset.col));

});

gridEl.addEventListener("mouseover", function(event){
    if(!isDrawing)return;

    const cell = event.target;
    if(!cell.classList.contains("cell")) return;

    toggleWall(Number(cell.dataset.row), Number(cell.dataset.col));
});

document.addEventListener("mouseup", function(){
    isDrawing = false;
});

clearWallsBtn.addEventListener("click", function(){
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            if (grid[row][col] === "wall"){
                grid[row][col] = "empty";
            }
        }
    }
    renderGrid();
    gridStatusEl.textContent = "Walls cleared.";
});

resetGridBtn.addEventListener("click", function(){
    createGrid();
    renderGrid();
    gridStatusEl.textContent = "Grid reset.";
});

createGrid();
renderGrid();