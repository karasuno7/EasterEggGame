# EasterEggGame

### Starting thoughts:
I want to use Fractals, cellular automata (like Conway's Game of Life), trigonometric functions, and noise functions (like Perlin and Simplex noise) as sources for creating interesting patterns.
I want to use math functions to alter color properties dynamically. For example, use sine waves to oscillate color values over time and Map different regions of your pattern to different color ranges. For instance, higher values in a noise-generated landscape might correspond to whites and blues for snowy peaks, while lower areas are greens and browns.
I also want to look into using shaders to apply and manipulate patterns in real-time, allowing for interactive or evolving textures on the game shapes and implement color changing algorithms that respond to game events or other triggers.

The project can evolve in 3 stages. With stage 1 starting simple but functional as a 2d game of easter eggs (4 eggs at 1x speed?) using HTML/JS. The events involve egg touching and resetting speeds to 1x,  with probabilistic outcomes of - breaking and losing a point, gaining a point, a Moses figure appearing with a saying or a joke, or getting 1-3 new eggs, or a chance at guessing the probability of any one of the events to gain 10 points) . Every 15 sec the eggs are kept apart , you gain 3 points but 0.2x increase in speed of egg movement)
Here's an idea for egg movement evolution:
- stage 1 simple as moving with one orientation
- stage 2 with random starting orientations 
- stage 3 with dynamically changing orientations.

