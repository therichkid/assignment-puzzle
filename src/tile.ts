import { NUM_COLS, NUM_ROWS } from "./config.js";
import { addDragHandlers } from "./drag.js";
import { refs } from "./refs.js";

export const generateTiles = (): HTMLDivElement[] => {
	const tiles: HTMLDivElement[] = [];
	const numTiles = NUM_COLS * NUM_ROWS;
	const xSize = (NUM_COLS + 1) * 100;
	const ySize = (NUM_ROWS + 1) * 100;

	for (let i = 0; i < numTiles; i++) {
		const tile = document.createElement("div");

		tile.style.backgroundImage = `url("${refs.imageSelect.value}")`;
		tile.style.backgroundPosition = `${calcXPos(i)}% ${calcYPos(i)}%`;
		tile.style.backgroundSize = `${xSize}% ${ySize}%`;

		tile.id = `${i}`;
		addDragHandlers(tile);

		tiles.push(tile);
	}

	return tiles;
};

const calcXPos = (i: number): number => {
	return (i % NUM_COLS) * (100 / NUM_COLS);
};

const calcYPos = (i: number): number => {
	return Math.floor(i / NUM_COLS) * (100 / NUM_ROWS);
};
