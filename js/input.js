import { applyUniformForce } from './physics.js';
/**
 * This script manages user interactions, abstracting away the complexity of handling both mouse and touch inputs.
 * The handleInput function is set up to attach event listeners to the canvas and process input events.
 */

export function handleInput(canvas, eggs) {
    // Mouse click event listener
    canvas.addEventListener('click', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        applyUniformForce(eggs, x, y);
    });

    // Touch event listener
    canvas.addEventListener('touchstart', event => {
        event.preventDefault(); // Prevent default actions like scrolling
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        applyUniformForce(eggs, x, y);
    });
}
