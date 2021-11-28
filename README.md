# Wagawin Assignment Puzzle

## How to run

Run a local web server that serves `index.html`.

Or use the hot reload server from this project:

- `npm install`
- `npm run start`

## Structure

The project is written in TypeScript, all TS sources are under `src/` and are transpiled to `build/`. The few lines of HTML and CSS are in the root folder.

### Modules

- `config.ts` - user config: change number of columns and rows
- `main.ts` - main module, includes the methods run on init, element event listeners and their methods
- `drag.ts` - event handlers on the tiles for drag and drop
- `tile.ts` - tile generation
- `refs.ts` - stores the references of multiple DOM elements

## How did development go?

I picked the first task, which in my opinion is way more challenging, but as well more interesting.

I thought about solutions on how to display the image in split tiles. My initial approach was with `clip-path` but this did not go well as it doesn't remove the white spaces from the image.

I then went with displaying the image as a background, which went significantly better. I use percentages on the tiles for better responsiveness.

At some point I decided to modularize the code for better structure and readability.

For swapping the tiles, I am using the drag events for desktop browsers and the touch events for mobile browsers. I was quite surprised that mobile doesn't support drag.

### Biggest challenges

- Finding a way to split the image into tiles
- Making the image container and tiles responsive
