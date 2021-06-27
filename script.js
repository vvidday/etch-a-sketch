

const container = document.getElementById("container");

let eraserMode = false;
let rainbowMode = false;


function generateGrid(row){
    let w = container.offsetWidth;
    container.style.height = `${w}px`;
    container.style.gridTemplateRows = `repeat(${row}, minmax(0, 1fr))`;
    for(let i = 0; i < row; i++){
        let currentRow = document.createElement("div");
        currentRow.classList.add("rows");
        currentRow.style.gridTemplateColumns = `repeat(${row}, minmax(0, 1fr))`;
        for(let j = 0; j < row; j++){
            let sq = document.createElement("div");
            sq.classList.add("squares");
            sq.style.gridColumnStart = j+1;
            sq.addEventListener("mouseenter", changeToTeal);
            currentRow.appendChild(sq);
        }
        container.appendChild(currentRow);
    }
}


function changeToTeal(e){
    this.style.backgroundColor = "teal";
}

function changeToRainbow(e){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function erase(e){
    this.style.backgroundColor = "white";
}


function applyFunction(func){
    let children = container.children;
    for (let i = 0; i < children.length; i++){
        let rowchildren = children[i].children;
        for(let j = 0; j < rowchildren.length; j++){
            func(rowchildren[j]);
            }
        }
    }


//reset button
document.getElementById("reset-button").onclick = () => {
    applyFunction((child) => {

        if (child.style.backgroundColor){
            child.style.backgroundColor = "white";
        }
    })
} 


//new grid
document.getElementById("new-grid-button").onclick = () =>{
    let newlength = 0;
    do{
    let tmp = prompt("Please choose a length between 1 and 100.");
    if(tmp == null){return}
    newlength = parseInt(tmp);
    }
    while(isNaN(newlength) || newlength < 0 || newlength > 100);

    container.innerHTML = "";
    generateGrid(newlength);
    if(rainbowMode){
        rainbowMode = false;
        rainbowButton.classList.remove("active");
    }
    if(eraserMode){
        eraserMode = false;
        eraserButton.classList.remove("active");
    }
}


//rainbow button
const rainbowButton = document.getElementById("rainbow-button");

rainbowButton.onclick = () =>{
    if(!rainbowMode){
        if(eraserMode){
            eraserMode = false;
            eraserButton.classList.remove("active");
        }
        rainbowMode = true;
        rainbowButton.classList.add("active");
        applyFunction((child) => {
            child.removeEventListener("mouseenter", changeToTeal);
            child.addEventListener("mouseenter", changeToRainbow);
        })
    }
    else{
        rainbowMode = false;
        rainbowButton.classList.remove("active");
        applyFunction((child) => {
            child.removeEventListener("mouseenter", changeToRainbow);
            child.addEventListener("mouseenter", changeToTeal);
        })
    }
}


const eraserButton = document.getElementById("eraser-button");
eraserButton.onclick = () =>{
    if(!eraserMode){
        eraserMode = true;
        eraserButton.classList.add("active");
        if(rainbowMode){
            rainbowMode = false;
            rainbowButton.classList.remove("active");
            applyFunction((child) =>{
                child.removeEventListener("mouseenter", changeToRainbow);
                child.addEventListener("mouseenter", erase);
            })
        }
        else{
            applyFunction((child) =>{
                child.removeEventListener("mouseenter", changeToTeal);
                child.addEventListener("mouseenter", erase);
            })
        }

    }
    else{
        eraserMode = false;
        eraserButton.classList.remove("active");
        applyFunction((child) =>{
            child.removeEventListener("mouseenter", erase);
            child.addEventListener("mouseenter", changeToTeal);
        })
    }

}



//Since we dynamically generate the height of the container, we need to automatically resize it upon screen resize.
window.addEventListener('resize', () =>{
    let w = container.offsetWidth;
    container.style.height = `${w}px`;
})


//default
generateGrid(16);
