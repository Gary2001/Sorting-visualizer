// GLOBALS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
let ticks;
let LENGTH = 200;
let values = []
let isSorting = false
let SORT_SPEED = 50
let isBubbleSorting = false
let isInsertionSorting = false

// Shuffles array with random values
function shuffle() {
    isSorting=false
    for (let i=0; i<LENGTH; i++) {
        values[i]= Math.floor(Math.random()* (canvas.height))
    }    
}
// draw length of rectangle is based on size of value in values
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (let i=0; i<values.length; i++) {
        ctx.fillRect(i*canvas.width/LENGTH, canvas.height-values[i], canvas.width/LENGTH-1, canvas.height)
    }
}
shuffle()
draw()

// EVENT LISTENERS:
let speedSlider = document.getElementById('speed-slider')
let lengthSlider = document.getElementById('length-slider')
lengthSlider.addEventListener('input', () =>{
    isSorting = false
    document.getElementById('length-slider-label').innerHTML = lengthSlider.value  
    LENGTH = lengthSlider.value
    values = []
    shuffle()
    draw()
})
speedSlider.addEventListener('input', () =>{
    document.getElementById('speed-slider-label').innerHTML = speedSlider.value  
    SORT_SPEED = speedSlider.value
    if (isInsertionSorting) {
        clearInterval(ticks)
        insertionSort()
        draw()
    }
    else if (isBubbleSorting) {
        clearInterval(ticks)
        bubbleSort()
        draw()
    }
})
document.getElementById('shuffle-btn').addEventListener("click", () =>{
    shuffle()
    draw()
})
document.getElementById('insertion-sort-btn').addEventListener("click", () =>{
    clearInterval(ticks)
    insertionSort()
    draw()
})
document.getElementById('bubble-sort-btn').addEventListener("click", () =>{
    clearInterval(ticks)
    bubbleSort()
    draw()
})
document.getElementById('selection-sort-btn').addEventListener("click", () =>{
    clearInterval(ticks)
    selectionSort()
    draw()
})


// SORTING ALGORITHMS:
function insertionSort() {
    isInsertionSorting = true
    isSorting = true
    let i = 0;
    let j = 0;
    ticks = setInterval(function() {
        // iterates over array
        if (i < values.length && isSorting) {
            i++
            j = i
            // compares value at index j and the value before index j
            while (j != 0 && values[j-1] > values[j]) {
                // if before value is bigger swaps values
                let tmp = values[j];
                values[j] = values[j-1];
                values[j-1] = tmp;
                j--;
            }   
        }
        // when done iterating it ends interval timer
        else {
            clearInterval(ticks)
            isInsertionSorting = false
            isSorting = false
        }
        draw()
    }, 100 - SORT_SPEED)    
}

function bubbleSort () {
    isBubbleSorting = true
    isSorting = true
    let i = 0
    ticks = setInterval(() => {
        if (i < values.length && isSorting) {
            i++
            for (let j = 0; j < values.length; j++) {
                if (values[j] > values[j + 1]) {
                    let tmp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = tmp;
                }
            }
        }
        else {
            clearInterval(ticks)
            isSorting = false
            isBubbleSorting = false
        }
        draw()
    }, 100 - SORT_SPEED)
}
