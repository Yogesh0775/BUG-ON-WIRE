// Set up timer variables
let startTime;
let elapsedTime = 0;
let timerInterval;

// Function to start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay();
    }, 10); // Update every 10 milliseconds (adjust as needed)
}


// Function to update the timer display on the screen
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = formatTime(elapsedTime);
}

// Function to format the time in mm:ss format
function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // Extracting two digits for milliseconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
}



// Function to pause the timer and clear the interval
function pauseTimer() {
    clearInterval(timerInterval);
}

// Function to reset the timer
function resetTimer() {
    elapsedTime = 0;
    updateTimerDisplay();
}
// Get the audio element
const gameAudio = document.getElementById('gameAudio');

// Function to start playing the audio
function playAudio() {
    gameAudio.play();
}

// Function to pause the audio
function pauseAudio() {
    gameAudio.pause();
}

// Function to restart the audio
function restartAudio() {
    gameAudio.currentTime = 0;
    playAudio();
}

// Get the canvas and context
const canvas = document.getElementById("canvas1");        
const ctx = canvas.getContext("2d");


// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Set scroll speed
let gameSpeed = 10;


// Background Layer class for drawing and updating background images and positions
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 720;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

// ElectricityPole class for adding electricity poles
class ElectricityPole {
    constructor(image, x) {
        this.x = x;
        this.y = 128;
        this.width = 512;
        this.height = 512;
        this.image = image;
    }

    update() {
        this.x -= gameSpeed;
        if (this.x + this.width < 0) {
            this.x = CANVAS_WIDTH + 600;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

//bugclass
class Bug {
    constructor() {
        this.x = 200;
        this.y = 250;
        this.width = 75;
        this.height = 30;
        this.speed = 0; // Adjusted speed for visibility
        this.bugImage = new Image();
        this.bugImage.src = './images/bug.png'; // Replace with the path to your bug image
    }

    update() {
        this.x += this.speed;
        if (this.x > CANVAS_WIDTH) {
            this.x = 0;
        }
    }

    draw() {
        
        ctx.drawImage(this.bugImage, this.x-this.width , this.y-this.height /2 , this.width, this.height);
    }
}

// Obstacle class
class Obstacle {
    constructor(y) {
        this.x = CANVAS_WIDTH; // Initial x-position of the obstacle (start off-screen)
        this.y = y-25; // y-position of the obstacle (will be set later)
        this.width = 40; // Adjust the width of the obstacle as needed
        this.height = 30; // Adjust the height of the obstacle as needed
        this.speed = gameSpeed; // Obstacle speed
       
        // Obstacle Image
    this.image = new Image();
    this.image.src = "./images/shadow_dog1.png"; 
   
    }

    update() {
        // Randomly determine if the obstacle should appear in this frame
        if (Math.random() < 0.001) { // Adjust the probability (0.01 = 1% chance per frame)
            // Randomly choose a wire for the obstacle to appear on
            this.y = Math.floor(Math.random() * 3) * 80 + 250 - 80;
             this.x = CANVAS_WIDTH; // Reset the obstacle's position to the right of the canvas
        }

        // Update obstacle position based on speed
        this.x -= this.speed;

        // // Check if the obstacle has gone beyond the canvas
        // if (this.x + this.width < 0) {
        //     this.x = CANVAS_WIDTH; // Reset the obstacle's position to the right of the canvas
        // }
             // Check if the obstacle has gone beyond the canvas
             if (this.x + this.width < 0) {
                // Remove the obstacle from the obstacles array
                const index = obstacles.indexOf(this);
                if (index !== -1) {
                    obstacles.splice(index, 1);
                }}}
    
            

    draw() {
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    }
}



//drawing function curve for wire
function drawSemicircle(startX, startY, endX, endY, radius) {
   
    const controlX1 = startX + radius;
    const controlY1 = startY + radius;
    const controlX2 = endX - radius;
    const controlY2 = endY + radius;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    ctx.strokeStyle = "black"; // Adjust the color of the curve
    ctx.lineWidth = 7; // Adjust the width of the curve
    ctx.stroke();
    
}

// Background images
const backgroundLayer1 = new Image();
backgroundLayer1.src = "./images/backgroundLayers/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./images/backgroundLayers/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./images/backgroundLayers/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./images/backgroundLayers/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./images/backgroundLayers/layer-5.png";

// Pole Image
const poleImage = new Image();
poleImage.src = "./images/backgroundLayers/klipartz.com (2).png";

// Bug
const bug = new Bug();

// Background Images
const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2 = new Layer(backgroundLayer2, 0.5);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.5);
const layer5 = new Layer(backgroundLayer5, 0.5);
const gameObjects = [layer1, layer2, layer3, layer4, layer5];

// Electricity Poles
const poles = [
    new ElectricityPole(poleImage, 1200),
    new ElectricityPole(poleImage, 2400),
    // Add more poles as needed
];
// Obstacles
const obstacles = [];
// Function to generate obstacles
function generateObstacles() {
    // Generate a new obstacle with a certain probability
    if (Math.random() < 0.03) {
        // Randomly choose a wire for the obstacle to appear on
        const wireY = Math.floor(Math.random() * 3) * 80 + 250 - 80;
        obstacles.push(new Obstacle(wireY));
    }
}


// Event listener for keydown
document.addEventListener('keydown', handleKeyDown);

// Function to handle keydown events
function handleKeyDown(event) {
    const key = event.key;

    if (key === 'ArrowUp') {
        bug.y = Math.max(bug.y - 80, 250 - 80);
    } else if (key === 'ArrowDown') {
        bug.y = Math.min(bug.y + 80, 250 + 80);
    } else if (key === 'Enter') {
        restartGame();
    }
}




// Main animation loop
function animate() {
    if (gameSpeed==0) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameObjects.forEach(Object => {
        Object.update();
        Object.draw();
    });

    poles.forEach(pole => {
        pole.update();
        pole.draw();
    });

     //3 wires
    drawSemicircle(0, 250, 2400, 250, 10);
    drawSemicircle(0, 250 - 80, 2400, 250 - 80, 10);
    drawSemicircle(0, 250 + 80, 2400, 250 + 80, 10);

    bug.update();
    bug.draw();
   // Update and draw obstacles
   obstacles.forEach((obstacle) => {
    
    obstacle.update();
    obstacle.draw();
     // Check for collision between bug and obstacle
     if (isCollision(bug, obstacle)) {
        pauseGame(); // Pause the game on collision
    }
});



// Generate new obstacles
generateObstacles();
 
    requestAnimationFrame(animate);
}


// Function to check collision between two objects
function isCollision(obj1, obj2) {
    return (
        obj1.x-80 < obj2.x + obj2.width &&
        obj1.x -80+ obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );

}

// Function to pause the game on collision
function pauseGame() {
    gameSpeed = 0;
    bug.y = 250; // Set the bug back to its original position
    pauseTimer(); // Pause the timer
    pauseAudio(); // Pause the audio

      // Display game over status
      const gameStatus = document.getElementById('gameStatus');
      const scoreText = document.getElementById('score');
      scoreText.textContent = formatTime(elapsedTime);
      gameStatus.style.zIndex = 1;
      gameStatus.style.display = 'block';
      // Focus on the restart text for better user experience
      const restartText = document.getElementById('restartText');
      restartText.focus();
}

// Set up timer display on the screen
const timerDisplay = document.createElement('div');
timerDisplay.id = 'timer';
timerDisplay.style.position = 'absolute';
timerDisplay.style.top = '10px';
timerDisplay.style.left = '10px';
timerDisplay.style.fontSize = '20px';
document.body.appendChild(timerDisplay);


// Function to restart the game
function restartGame() {
    if (gameSpeed === 0) {
        gameSpeed = 5; // Set the game speed back to its original value
        location.reload(); // Reload the page to restart the game
        playAudio(); // Start playing the audio

            // Hide the game over status
            const gameStatus = document.getElementById('gameStatus');
            gameStatus.style.display = 'none';

    }
   
}



// Start the game by starting the timer
startTimer();
playAudio();

// Start the animation loop
animate();





