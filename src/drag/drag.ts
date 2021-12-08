import { moveDragTile, setDragTile, unsetDragTile } from "./mobile.js";
import { refs } from "../refs.js";
import { throttle } from "../throttle.js";

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

	const { pageX: endX, pageY: endY } = event;

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

export const swapTiles = (tile1: HTMLDivElement, tile2: HTMLDivElement): void => {
	const next2 = tile2.nextSibling;

	if (next2 === tile1) {
		refs.imageContainer.insertBefore(tile1, tile2);
	} else {
		refs.imageContainer.insertBefore(tile2, tile1);
		refs.imageContainer.insertBefore(tile1, next2);
	}
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

export const evaluateTileOrder = (): void => {
	const tiles = <HTMLDivElement[]>Array.from(refs.imageContainer.childNodes);
	if (tiles.every((tile, i) => parseInt(tile.children[0].id, 10) === i)) {
		alert("Congratulations, all tiles are in order!");
	}
};
