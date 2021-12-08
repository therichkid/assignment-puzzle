import { evaluateTileOrder, swapTiles, toggleTileGrid } from "./drag.js";
import { refs } from "./refs.js";
import { throttle } from "./throttle.js";

export const addMobileDragHandlers = (tile: HTMLDivElement): void => {
	tile.ontouchstart = (event: TouchEvent): void => {
		toggleTileGrid(true);

		const startTile = <HTMLDivElement>event.target;
		const { pageX: startX, pageY: startY } = event.changedTouches[0];
		setDragTile(startTile, [startX, startY]);

		event.preventDefault();
	};

	tile.ontouchmove = throttle((event: TouchEvent): void => {
		const { pageX: currX, pageY: currY } = event.changedTouches[0];
		moveDragTile([currX, currY]);
	}, 20);

	tile.ontouchend = (event: TouchEvent): void => {
		const { pageX: endX, pageY: endY } = event.changedTouches[0];

		const startTile = <HTMLDivElement>event.target;
		const [, endTile] = <HTMLDivElement[]>document.elementsFromPoint(endX, endY);

		toggleTileGrid(false);
		unsetDragTile();

		if (!endTile || endTile.tagName !== "DIV" || typeof parseInt(endTile.id, 10) !== "number") {
			return;
		}

		const startTileContainer = <HTMLDivElement>startTile.parentElement;
		const endTileContainer = <HTMLDivElement>endTile.parentElement;

		swapTiles(startTileContainer, endTileContainer);
		setTimeout(evaluateTileOrder);
	};
};

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
