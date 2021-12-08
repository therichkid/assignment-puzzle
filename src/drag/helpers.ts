import { refs } from "../refs.js";

export const setDragTile = (tile: HTMLDivElement, [x, y]: [number, number]): void => {
	const { width, height } = tile.getBoundingClientRect();

	tile.style.position = "fixed";
	tile.style.left = `${x - width / 2}px`;
	tile.style.top = `${y - height / 2}px`;
	tile.style.width = `${width}px`;
	tile.style.height = `${height}px`;

	refs.dragTile = tile;
};

export const moveDragTile = ([x, y]: [number, number]): void => {
	const tile = refs.dragTile;

	if (!tile) {
		return;
	}

	const width = parseInt(tile.style.width, 10);
	const height = parseInt(tile.style.height, 10);

	tile.style.left = `${x - width / 2}px`;
	tile.style.top = `${y - height / 2}px`;
};

export const unsetDragTile = (): void => {
	const tile = refs.dragTile;

	if (!tile) {
		return;
	}

	tile.style.position = tile.style.left = tile.style.top = "";
	tile.style.width = "100%";
	tile.style.height = "100%";

	refs.dragTile = null;
};

export const toggleTileGrid = (shouldShow: boolean): void => {
	const tiles = <HTMLDivElement[]>Array.from(refs.imageContainer.childNodes);
	tiles.forEach(tile => {
		if (shouldShow) {
			tile.style.border = "1px solid #fff";
		} else {
			tile.style.border = "";
		}
	});
};

export const wasDroppedOnTile = (endTile: HTMLDivElement): boolean => {
	return endTile && endTile.tagName === "DIV" && !isNaN(parseInt(endTile.id, 10));
};

export const evaluateTileOrder = (): void => {
	const tiles = <HTMLDivElement[]>Array.from(refs.imageContainer.childNodes);
	if (tiles.every((tile, i) => parseInt(tile.children[0].id, 10) === i)) {
		alert("Congratulations, all tiles are in order!");
	}
};
