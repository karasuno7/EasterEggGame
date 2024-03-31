import {determineOutcome} from './outcomes.js';

/**
 * Physics of movement
 */
export const applyUniformForce = (objects, x, y) => {
  objects.forEach(obj => {
    const dx = obj.x - x;
    const dy = obj.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Apply force only if the click/touch is within a certain radius
    if (distance < 500 && distance > 0) { // Avoid division by zero
      const forceMagnitude = 100 / distance; // Adjust for stronger/weaker force
      obj.vx += (dx / distance) * forceMagnitude;
      obj.vy += (dy / distance) * forceMagnitude;
    }
  });
};


/**
 * Energy Loss on edge reflection/bounce
 * @param obj
 * @param canvasWidth
 * @param canvasHeight
 */
export const reflectWithEnergyLoss = (obj, canvasWidth, canvasHeight) => {
  const energyLossFactor = 0.6;

  // Reflect off left or right edges with energy loss
  if (obj.x <= 0 || obj.x >= canvasWidth) {
    obj.vx = -obj.vx * energyLossFactor;
    obj.x = Math.max(Math.min(obj.x, canvasWidth), 0);
  }

  // Reflect off top or bottom edges with energy loss
  if (obj.y <= 0 || obj.y >= canvasHeight) {
    obj.vy = -obj.vy * energyLossFactor;
    obj.y = Math.max(Math.min(obj.y, canvasHeight), 0);
  }
};

/**
 * Optimised spatial partitioning approach to detect collisions
 * @param objArray
 * @param height
 * @param width
 * @param scoreUpdateCallback
 * @returns {*[]}
 */

export const checkForCollisions = (objArray, height, width, scoreUpdateCallback) => {
    // Threshold for collision
    const threshold = 75;

    // Reset grid each frame to ensure it's up-to-date
    initGrid(height, width);
    objArray.forEach(obj => addToGrid(obj)); // Add all objects to the grid

    let updatedArray = [...objArray];
    let toCheck = []; // Keep track of pairs to check to avoid duplicates

    // Iterate over each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = grid[row][col];
            if (cell.length > 1) {
                // Check for collisions within the cell
                for (let i = 0; i < cell.length; i++) {
                    for (let j = i + 1; j < cell.length; j++) {
                        const obj1 = cell[i];
                        const obj2 = cell[j];
                        const dx = obj1.x - obj2.x;
                        const dy = obj1.y - obj2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < threshold) {
                            if (!toCheck.find(pair => (pair[0] === obj1 && pair[1] === obj2) || (pair[0] === obj2 && pair[1] === obj1))) {
                                toCheck.push([obj1, obj2]);
                            }
                        }
                    }
                }
            }
            // Optionally, add checks for adjacent cells to ensure no collisions are missed
        }
    }

    // Process collisions for all pairs found
    toCheck.forEach(pair => {
        updatedArray = determineOutcome(updatedArray, pair[0], pair[1], height, width, scoreUpdateCallback);
    });

    return updatedArray;
};



const CELL_SIZE = 300;
let grid = [];
let cols, rows;

export function initGrid(height, width) {
    cols = Math.ceil(width / CELL_SIZE);
    rows = Math.ceil(height / CELL_SIZE);
    grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => []));
}

export function addToGrid(obj) {
    const col = Math.floor(obj.x / CELL_SIZE);
    const row = Math.floor(obj.y / CELL_SIZE);
    if (grid[row] && grid[row][col]) {
        grid[row][col].push(obj);
    }
    obj.gridIndex = { row, col }; // Keep track of the obj's current grid position for easy removal
}

export function removeFromGrid(obj) {
    const { row, col } = obj.gridIndex;
    if (grid[row] && grid[row][col]) {
        grid[row][col] = grid[row][col].filter(e => e !== obj);
    }
}
