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
    if (distance < 300 && distance > 0) { // Avoid division by zero
      const forceMagnitude = 300 / distance; // Adjust for stronger/weaker force
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

export const checkForCollisions = (objArray, height, width, scoreUpdateCallback) => {
  const threshold = 75; // Todo: change collision threshold if needed
  let updatedArray = [...objArray];
  objArray.forEach((obj1, index1) => {
    objArray.forEach((obj2, index2) => {
      if (index1 === index2) return; // Skip self

      const dx = obj1.x - obj2.x;
      const dy = obj1.y - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < threshold) { // If eggs are within x pixels
        updatedArray = determineOutcome(updatedArray, obj1, obj2, height, width, scoreUpdateCallback);
      }
    });
  });
  return updatedArray;
};
