import { refs } from "../refs.js";
import { swapNodes } from "../swap.js";
import { throttle } from "../throttle.js";
import {
	evaluateTileOrder,
	moveDragTile,
	setDragTile,
	toggleTileGrid,
	unsetDragTile,
	wasDroppedOnTile
} from "./helpers.js";

export const addMobileDragHandlers = (tile: HTMLDivElement): void => {
	tile.ontouchstart = (event: TouchEvent): void => {
		toggleTileGrid(true);

		const startTile = <HTMLDivElement>event.target;
		const { pageX: startX, pageY: startY } = event.changedTouches[0];
		setDragTile(startTile, [startX, startY]);

		window.addEventListener("touchmove", onTouchMove);
		window.addEventListener("touchend", onTouchEnd);

		event.preventDefault();
	};
};

const onTouchMove = throttle((event: TouchEvent): void => {
	const { pageX: currX, pageY: currY } = event.changedTouches[0];
	moveDragTile([currX, currY]);
}, 20);

const onTouchEnd = (event: TouchEvent): void => {
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("touchend", onTouchEnd);

	toggleTileGrid(false);

	const { pageX: endX, pageY: endY } = event.changedTouches[0];
	const startTile = <HTMLDivElement>refs.dragTile;
	const [, endTile] = <HTMLDivElement[]>document.elementsFromPoint(endX, endY);

	unsetDragTile();

	if (!wasDroppedOnTile(endTile)) {
		return;
	}

	swapNodes(startTile, endTile);

	setTimeout(evaluateTileOrder);
};
