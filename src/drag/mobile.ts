import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, swapTiles, toggleTileGrid, unsetDragTile } from "./helpers.js";

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
