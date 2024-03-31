import Egg from './eggs.js';
import {handleInput} from './input.js';
import {addToGrid, checkForCollisions, initGrid} from "./physics.js";

/**
 * Main game file handles game loop
 * Author: Aditi Tripathi
 */

let canvas, ctx;
let eggs = [];
let eggCount = 3; // Todo: Change initial count here
const maxEggs = 8;
let gameRunning = true;
let lastEggAddedTime = 0;
let score = 0; // Initial score

document.addEventListener('DOMContentLoaded', setup);

function setup() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initGrid(canvas.height, canvas.width);
  // Initialize eggs
  for (let i = 0; i < eggCount; i++) {
    const newEgg = new Egg(canvas.width, canvas.height);
    eggs.push(newEgg);
    addToGrid(newEgg); // Add egg to the grid
  }

  lastEggAddedTime = performance.now();
  score = 0; // Reset score

  handleInput(canvas, eggs); // Pass eggs array for interaction handling
  gameLoop(); // Start the game loop
}

const updateScore = (points) => {
  score += points;
  document.getElementById('score').innerText = score;
};

const stopGame = () => {
  gameRunning = false;
  const gameOverScreen = document.getElementById('gameOverScreen');
  document.getElementById('finalScore').innerText = `Your basket has ${score} eggs`;
  const baseShareURL = "https://development.d2s0vd9dajmu13.amplifyapp.com/?score=";
  document.getElementById('shareLink').href = `${baseShareURL}${score}`;
  document.getElementById('shareLink').innerText = "Share Your Eggs!";
  gameOverScreen.style.display = 'block';
};

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const currentTime = performance.now();
  const timeSinceLastEggAdded = (currentTime - lastEggAddedTime) / 1000;

  // updateBackground(ctx); // Update the dynamic background
  eggs.forEach(egg => {
    egg.update();
    egg.draw(ctx);
  });
  eggs = checkForCollisions(eggs, canvas.height, canvas.width, updateScore);

  if (eggs === null) {
    stopGame();
    return;
  }
  if (timeSinceLastEggAdded >= 15 && eggs.length < maxEggs) {
    eggs.push(new Egg(canvas.width, canvas.height));
    lastEggAddedTime = currentTime;
    updateScore(3);
  }
  /**
   * Execution Frequency of requestAnimationFrame()
   * 1. Browser Refresh Rate: requestAnimationFrame() tries to execute the game loop in sync with the browser's refresh rate.
   *    For most modern monitors, this is typically 60 Hz, which means the game loop aims to run approximately every 16.67ms
   *    (1000 ms/60 fps = 16.67 ms per frame).
   * 2. Variable: The actual rate can vary depending on the browser's load, the device's capabilities, and whether the tab is active.
   *    Browsers may throttle or pause requestAnimationFrame() callbacks in inactive tabs to save resources.
   * 3. V-Sync: By syncing with the display's refresh rate, requestAnimationFrame() also helps prevent visual artifacts like tearing,
   *    making it preferable for animations and games over setTimeout() or setInterval().
   */
  requestAnimationFrame(gameLoop);
}
