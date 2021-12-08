import { NUM_COLS, NUM_ROWS } from "./config.js";
import { addDragHandlers } from "./drag/desktop.js";
import { addMobileDragHandlers } from "./drag/mobile.js";
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
		tile.style.width = "100%";
		tile.style.height = "100%";

		tile.id = `${i}`;
		addDragHandlers(tile);
		addMobileDragHandlers(tile);

		const tileContainer = document.createElement("div");
		tileContainer.appendChild(tile);

		tiles.push(tileContainer);
	}

	return tiles;
};

const calcXPos = (i: number): number => {
	return (i % NUM_COLS) * (100 / NUM_COLS);
};

const calcYPos = (i: number): number => {
	return Math.floor(i / NUM_COLS) * (100 / NUM_ROWS);
};
