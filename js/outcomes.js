import Egg from "./eggs.js";

/**
 * Different outcomes when eggs are under collision state
 */
const outcomes = {
  collideAndBreak: (eggs, egg1, egg2, updateScore) => {
    console.log("breaking egg");
    egg1.isBroken = true;
    egg2.isBroken = true;
    updateScore(-1); // Lose a
    return eggs.filter(egg => !egg.isBroken);
  },
  createNewEgg: (eggs, egg1, egg2, height, width, updateScore) => {
    console.log("you got another egg");
    eggs.push(new Egg(width, height))
    updateScore(1); // Gain a point
    return eggs
  }
};

// Function to probabilistically determine and execute an outcome
export const determineOutcome = (eggs, egg1, egg2, height, width, updateScore) => {
  if (eggs === null) return null;
  const eventOutcome = Math.random(); //Todo: change the probability function as required
  console.log("checking outcome prob: ", eventOutcome);
  if (eventOutcome < 0.1) {
    eggs = outcomes.collideAndBreak(eggs, egg1, egg2, updateScore);
    return null;

  } else {
    // If creating a new egg, the function can return true, indicating to the caller that a new egg should be added
    eggs = outcomes.createNewEgg(eggs, egg1, egg2, height, width, updateScore);
  }

  return eggs;
};
