import { evaluateTileOrder, swapTiles, toggleTileGrid } from "./drag.js";
import { refs } from "./refs.js";

export const addMobileDragHandlers = (tile: HTMLDivElement): void => {
	tile.ontouchstart = (event: TouchEvent): void => {
		toggleTileGrid(true);

		const startTile = <HTMLDivElement>event.target;
		const { pageX: startX, pageY: startY } = event.changedTouches[0];
		addDragTile(startTile, [startX, startY]);

		event.preventDefault();
	};

	tile.ontouchmove = (event: TouchEvent): void => {
		const { pageX: currX, pageY: currY } = event.changedTouches[0];
		moveDragTile([currX, currY]);
	};

	tile.ontouchend = (event: TouchEvent): void => {
		const { pageX: endX, pageY: endY } = event.changedTouches[0];

		const startTile = <HTMLDivElement>event.target;
		const [, endTile] = <HTMLDivElement[]>document.elementsFromPoint(endX, endY);

		toggleTileGrid(false);
		removeDragTile();

		if (!endTile || endTile.tagName !== "DIV" || typeof parseInt(endTile.id, 10) !== "number") {
			return;
		}

		swapTiles(startTile, endTile);
		setTimeout(evaluateTileOrder);
	};
};

const addDragTile = (tileToClone: HTMLDivElement, [x, y]: [number, number]): void => {
	const { width, height } = tileToClone.getBoundingClientRect();

	const dragTile = <HTMLDivElement>tileToClone.cloneNode();
	dragTile.id = "drag-tile";
	dragTile.style.left = `${x - width / 2}px`;
	dragTile.style.top = `${y - height / 2}px`;
	dragTile.style.width = `${width}px`;
	dragTile.style.height = `${height}px`;

	refs.imageContainer.appendChild(dragTile);

	refs.dragTile = dragTile;
};

const moveDragTile = ([x, y]: [number, number]): void => {
	if (!refs.dragTile) {
		return;
	}

	const { width, height } = refs.dragTile.getBoundingClientRect();

	refs.dragTile.style.left = `${x - width / 2}px`;
	refs.dragTile.style.top = `${y - height / 2}px`;
};

const removeDragTile = (): void => {
	refs.dragTile?.remove();
	refs.dragTile = null;
};
