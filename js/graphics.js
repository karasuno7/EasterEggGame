/**
 * Simple designs +
 * sophisticated color-changing algorithms.
 * Explore using WebGL shaders (GLSL) in the /shaders directory for real-time visual effects based on game events or egg positions.
 */


/**
 * Draws slanted stripes on an egg.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Egg} egg - The egg object.
 */
export function drawStripes(ctx, egg) {
    const stripeWidth = 10; // Adjust for thicker stripes
    const numberOfStripes = Math.ceil(Math.sqrt(egg.width * egg.width + egg.height * egg.height) / stripeWidth);
    const colors = egg.colorPallette; // Array of colors for the stripes
    const angle = 50; // Angle for slanted stripes

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(egg.x, egg.y, egg.width / 2, egg.height / 2, 0, 0, 2 * Math.PI);
    ctx.clip(); // Clip to the egg shape

    // Translate to the egg's center for rotation
    ctx.translate(egg.x, egg.y);
    ctx.rotate(angle * Math.PI / 180); // Convert angle to radians and rotate

    for (let i = -numberOfStripes; i < numberOfStripes; i++) { // Start drawing from a negative offset
        ctx.fillStyle = colors[Math.abs(i) % colors.length]; // Cycle through the colors array
        ctx.fillRect(
            i * stripeWidth, // Shift each stripe to create the slanted effect
            -egg.height, // Start well above the visible area to cover the whole egg
            stripeWidth, // Stripe width
            2 * egg.height // Make sure the stripes are long enough to cover the egg height
        );
    }

    ctx.restore();
}


/**
 * Draws polka dots on an egg.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Egg} egg - The egg object.
 */
export function drawPolkaDots(ctx, egg) {
    const dotRadius = 5;
    const spaceBetweenDots = 10;
    const numberOfDotsX = Math.floor(egg.width / spaceBetweenDots);
    const numberOfDotsY = Math.floor(egg.height / spaceBetweenDots);
    ctx.save();
    ctx.clip(); // Clip to the egg shape
    for (let i = 0; i <= numberOfDotsX; i++) {
        for (let j = 0; j <= numberOfDotsY; j++) {
            ctx.fillStyle = egg.colorPallette[(i+j) % 2]; // Alternate between the two colors
            ctx.beginPath();
            ctx.arc(
                egg.x - egg.width / 2 + i * (2 * dotRadius + spaceBetweenDots) + dotRadius,
                egg.y - egg.height / 2 + j * (2 * dotRadius + spaceBetweenDots) + dotRadius,
                dotRadius,
                0,
                2 * Math.PI
            );
            ctx.fill();
        }
    }
    ctx.restore();
}


/**
 * Returns two distinct random colors.
 * @returns {Array} An array containing two distinct colors.
 */
export function getRandomColors() {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];
    while (color1 === color2) { // Ensure color2 is distinct
        color2 = colors[Math.floor(Math.random() * colors.length)];
    }
    return [color1, color2];
}
