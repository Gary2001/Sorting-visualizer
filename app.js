// GLOBALS
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
let ticks;
let LENGTH = 200;
let values = []
let isSorting = false

// Shuffles array with random values
function shuffle() {
    isSorting = false
    for (let i=0; i<LENGTH; i++) {
        values[i] = Math.random() * canvas.height
    }    
}
// draws different sized rectangles corresponding to number in values
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (let i=0; i<values.length; i++) {
        ctx.fillRect(i*canvas.width/LENGTH, 0, canvas.width/LENGTH-1, values[i])
    }
}
shuffle()
draw()

// EVENT LISTENERS:
let lengthSlider = document.getElementById('length-slider')
lengthSlider.addEventListener('input', ()=>{
    isSorting = false
    document.getElementById('length-slider-label').innerHTML = lengthSlider.value  
    LENGTH = lengthSlider.value
    values = []
    shuffle()
    draw()
})
document.getElementById('insertion-sort-btn').addEventListener("click", () =>{
    insertionSort(values)
})
document.getElementById('shuffle-btn').addEventListener("click", () =>{
    shuffle()
    draw()
})

// SORTING ALGORITHMS:
// every 10 milliseconds completes one outer loop iteration of insertionSort
function insertionSort(values) {
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
            isSorting = false
        }
        draw()
    }, 10)    
}
