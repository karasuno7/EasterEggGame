import Egg from "./eggs.js";

/**
 * Different outcomes when eggs are under collision state
 */
const outcomes = {
    collideAndBreak: (eggs, egg1, egg2, updateScore) => {
        egg1.isBroken = true; egg2.isBroken = true;
        updateScore(-1); // Lose a
      return eggs.filter(egg => !egg.isBroken);
    },
    createNewEgg: (eggs, egg1, egg2, updateScore) => {
        eggs.push(new Egg(egg1.x, egg1.y))
        updateScore(1); // Gain a point
      return eggs
    }
};

// Function to probabilistically determine and execute an outcome
export const determineOutcome = (eggs, egg1, egg2, updateScore) => {
    const eventOutcome = Math.random(); //Todo: change the probability function as required

    if (eventOutcome < 0.33) {
        eggs = outcomes.collideAndBreak(eggs, egg1, egg2, updateScore);

    } else if (eventOutcome < 0.66) {
        // If creating a new egg, the function can return true, indicating to the caller that a new egg should be added
        eggs = outcomes.createNewEgg(eggs, egg1, egg2, updateScore);
    }

    return eggs;
};
