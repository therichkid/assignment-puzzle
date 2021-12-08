import { refs } from "../refs.js";
import { throttle } from "../throttle.js";
import {
	evaluateTileOrder,
	moveDragTile,
	setDragTile,
	swapTiles,
	toggleTileGrid,
	unsetDragTile,
	wasDroppedOnTile
} from "./helpers.js";

export const addDragHandlers = (tile: HTMLDivElement): void => {
	tile.onmousedown = (event: MouseEvent): void => {
		toggleTileGrid(true);

		const startTile = <HTMLDivElement>event.target;
		const { pageX: startX, pageY: startY } = event;
		setDragTile(startTile, [startX, startY]);

		window.addEventListener("mousemove", onMouseDownMove);
		window.addEventListener("mouseup", onMouseUp);

		event.preventDefault();
	};
};

const onMouseDownMove = throttle((event: MouseEvent): void => {
	const { pageX: currX, pageY: currY } = event;
	moveDragTile([currX, currY]);
}, 20);

const onMouseUp = (event: MouseEvent): void => {
	window.removeEventListener("mousemove", onMouseDownMove);
	window.removeEventListener("mouseup", onMouseUp);

	toggleTileGrid(false);

	unsetDragTile();

	const { pageX: endX, pageY: endY } = event;
	const [, endTile] = <HTMLDivElement[]>document.elementsFromPoint(endX, endY);

	if (!wasDroppedOnTile(endTile)) {
		return;
	}

	const startTileContainer = <HTMLDivElement>refs.dragTile?.parentElement;
	const endTileContainer = <HTMLDivElement>endTile.parentElement;
	swapTiles(startTileContainer, endTileContainer);

	setTimeout(evaluateTileOrder);
};
