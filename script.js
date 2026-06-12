const myName = "Saimon";
let myCourse = "Computer science with Masters";
const myUni = "University of Nottingham";

const heading = document.querySelector("h1");

heading.addEventListener("click", function() {
    heading.style.color = "orange";
    heading.textContent = "You clicked me!!"
});



function introduce(name, course, university){
    console.log(`Hello, my name is ${name} and I study ${course} at ${university}!`)
}

myCourse = "nothing";

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

    palette.innerHTML = "";

    for(let i = 0; i < 5; i++) {
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

introduce(myName, myCourse, myUni);