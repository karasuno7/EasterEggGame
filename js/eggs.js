import {reflectWithEnergyLoss} from './physics.js';
import {drawStripes, drawPolkaDots, getRandomColors} from './graphics.js';

/**
 * This module  encapsulates everything related to eggs, including their creation, movement, and rendering.
 * Advanced movements:
 * movement patterns using trigonometric functions for varied egg orientations and possibly accelerations.
 * Introduces randomness in movement patterns for unpredictability.
 */
export default class Egg {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Set initial position randomly within the canvas
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.isBroken = false;
    const [color1, color2] = getRandomColors();
    this.colorPallette = [color1, color2];

    this.pattern = Math.random() > 0.5 ? 'stripes' : 'polkaDots';
    const direction = Math.random() * 2 * Math.PI; // Random direction
    const speed = 1; // adjust initial speed
    this.vx = Math.cos(direction) * speed; // or use uniform speed
    this.vy = Math.sin(direction) * speed;

    // Adjusted sizes for a more elongated egg shape
    this.width = 60; // Width between 40 and 60
    this.height = 100; // Height between 60 and 80

    // Random color
    let hue = Math.floor(Math.random() * 360);
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Reflect off the edges
    reflectWithEnergyLoss(this, this.canvasWidth, this.canvasHeight);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Apply patterns
    if (this.pattern === 'stripes') {
      drawStripes(ctx, this);
    } else if (this.pattern === 'polkaDots') {
      drawPolkaDots(ctx, this);
    }
  }

  // Method to slightly shift the egg's color
  shiftColor() {
    let hue = parseInt(this.color.slice(4, this.color.indexOf(','))); // Extract hue from HSL
    hue = (hue + 10) % 360; // Shift hue
    this.color = `hsl(${hue}, 100%, 50%)`;
  }
}
