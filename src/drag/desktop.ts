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

export const addDesktopDragHandlers = (tile: HTMLDivElement): void => {
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

	const { pageX: endX, pageY: endY } = event;
	const startTile = <HTMLDivElement>refs.dragTile;
	const [, endTile] = <HTMLDivElement[]>document.elementsFromPoint(endX, endY);

	unsetDragTile();

	if (!wasDroppedOnTile(endTile)) {
		return;
	}

	swapNodes(startTile, endTile);

	setTimeout(evaluateTileOrder);
};
