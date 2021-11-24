let grid;
let cols;
let rows;
let resolution = 10;
let startGame = false;
let gameState = "Click Cell to Change Color \n Left arrow to start \n Right arrow to pause "

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}



function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;

    createRandomArray();
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    if (startGame) {
        nextGridCompute();
        gameState = " "
    }
    fill(50, 200, 100)
    textSize(30)
    strokeWeight(4)
    text(gameState, width / 2, height / 2);
    textAlign(CENTER);
    strokeWeight(0.5)

    function nextGridCompute() {
        let next = make2DArray(cols, rows);

        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                // Count neighbors 
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);

                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }

        grid = next;
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function mousePressed() {
    console.log(grid[floor(mouseX / resolution)][floor(mouseY / resolution)])
    // if (grid[floor(mouseX / resolution)][floor(mouseY / resolution)] == 1) {
    //     grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 0;
    // }
    if (grid[floor(mouseX / resolution)][floor(mouseY / resolution)] == 0) {
        grid[floor(mouseX / resolution)][floor(mouseY / resolution)] += 1;
    }
    else {
        grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 0;
    }


}

//FOR pausing and starting the game again
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        startGame = true;
    }
    if (keyCode === RIGHT_ARROW) {
        startGame = false;
        gameState = "Paused \n Tip: Up arrow clears board, \n down makes new random board"
    }
    if (keyCode === UP_ARROW) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = 0;
            }
        }
    }
    if (keyCode === DOWN_ARROW) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = floor(random(2));
            }
        }
    }
}

function createRandomArray() {
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}


//This is the old sketch to put somewhere else later
// // All the paths
// let paths = [];
// // Are we painting?
// let painting = false;
// // How long until the next circle
// let next = 0;
// // Where are we now and where were we?
// let current;
// let previous;

// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     current = createVector(0, 0);
//     previous = createVector(0, 0);
//     //background = (100,100,100);
//     frameRate(10);
// };

// function draw() {
//     background(200,200,200);

//     // If it's time for a new point
//     if (millis() > next && painting) {

//         // Grab mouse position      
//         current.x = mouseX;
//         current.y = mouseY;

//         // New particle's force is based on mouse movement
//         let force = p5.Vector.sub(current, previous);
//         force.mult(0.05);

//         // Add new particle
//         paths[paths.length - 1].add(current, force);

//         // Schedule next circle
//         next = millis() + random(100);

//         // Store mouse values
//         previous.x = current.x;
//         previous.y = current.y;
//     }

//     // Draw all paths
//     for (let i = 0; i < paths.length; i++) {
//         paths[i].update();
//         paths[i].display();
//     }
// }

// // Start it up
// function mousePressed() {
//     next = 0;
//     painting = true;
//     previous.x = mouseX;
//     previous.y = mouseY;
//     paths.push(new Path());
// }

// // Stop
// function mouseReleased() {
//     painting = false;
// }

// // A Path is a list of particles
// class Path {
//     constructor() {
//         this.particles = [];
//         this.hue = random(100);
//     }

//     add(position, force) {
//         // Add a new particle with a position, force, and hue
//         this.particles.push(new Particle(position, force, this.hue));
//     }

//     // Display plath
//     update() {
//         for (let i = 0; i < this.particles.length; i++) {
//             this.particles[i].update();
//         }
//     }

//     // Display plath
//     display() {
//         // Loop through backwards
//         for (let i = this.particles.length - 1; i >= 0; i--) {
//             // If we shold remove it
//             if (this.particles[i].lifespan <= 0) {
//                 this.particles.splice(i, 1);
//                 // Otherwise, display it
//             } else {
//                 this.particles[i].display(this.particles[i + 1]);
//             }
//         }

//     }
// }

// // Particles along the path
// class Particle {
//     constructor(position, force, hue) {
//         this.position = createVector(position.x, position.y);
//         this.velocity = createVector(force.x*3, force.y*3);//Defines push away speed
//         this.drag = 1;//How far can it go?
//         this.lifespan = 255;
//     }

//     update() {
//         // Move it
//         this.position.add(this.velocity);
//         // Slow it down
//         this.velocity.mult(this.drag);
//         // Fade it out
//         this.lifespan--;
//     }

//     // Draw particle and connect it with a line
//     // Draw a line to another
//     display(other) {
//         let ranColorR = random(0,255);
//         let ranColorG = random(0,255);
//         let ranColorB = random(0,255);
//         stroke(ranColorR, ranColorG, ranColorB, this.lifespan);
//         strokeWeight(100);
//         fill(ranColorR, ranColorG, ranColorB, this.lifespan / 2);
//         //ellipse(this.position.x, this.position.y, 10, 10);
//         // If we need to draw a line
//         if (other) {
//             line(this.position.x, this.position.y, other.position.x, other.position.y);
//         }
//     }
// }