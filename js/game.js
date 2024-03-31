import Egg from './eggs.js';
import {handleInput} from './input.js';
import {checkForCollisions} from "./physics.js";
// import { updateBackground } from './background.js';

/**
 * Main game file handles game loop
 * If you were interested in doing a physics simulation, the controllable parameters are:
 * 1. initial number of eggs
 * 2. probability function for outcomes
 * 3. initial speed of eggs
 * 4. energy loss factor for eggs
 *
 * Author:Aditi Tripathi
 */
document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let eggs = [];
  const eggCount = 3; // Todo: Change initial count here
  const maxEggs = 8;

  // Initialize eggs
  for (let i = 0; i < eggCount; i++) {
    eggs.push(new Egg(canvas.width, canvas.height));
  }

  let lastEggAddedTime = performance.now();

  let score = 0; // Initial score

  const updateScore = (points) => {
    score += points;
    console.log("Score:", score);
    document.getElementById('scoreboard').innerText = `Score: ${score}`; // Update scoreboard display
  };

  handleInput(canvas, eggs); // Pass eggs array for interaction handling

  /**
   * Main game loop
   * This updates the game's state on each iteration, which includes:
   * Moving eggs
   * Handling user input (like keyboard presses or mouse clicks)
   * Applying game physics (such as gravity or collisions
   * Managing game mechanics (like scoring, collision events etc.)
   */
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = performance.now();
    const timeSinceLastEggAdded = (currentTime - lastEggAddedTime) / 1000;

    // updateBackground(ctx); // Update the dynamic background
    eggs.forEach(egg => {
      egg.update();
      egg.draw(ctx);
    });
    eggs = checkForCollisions(eggs, canvas.height, canvas.width, updateScore);

    // add new egg if no event and gain points
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

  gameLoop();
});

