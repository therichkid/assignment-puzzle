import { refs } from "./refs.js";

export const addDragHandlers = (tile: HTMLDivElement): void => {
	tile.setAttribute("draggable", "true");

	tile.ondragstart = (event: DragEvent): void => {
		event.dataTransfer?.setData("text/plain", tile.id);

		toggleTileGrid(true);
	};

	tile.ondragenter = (event: DragEvent): void => {
		(event.target as HTMLDivElement).style.opacity = "0.25";
	};

	tile.ondragover = (event: DragEvent): void => {
		event.preventDefault();
	};

	tile.ondragleave = (event: DragEvent): void => {
		(event.target as HTMLDivElement).style.opacity = "";
	};

	tile.ondrop = (event: DragEvent): void => {
		const startTileId = event.dataTransfer?.getData("text/plain") || "";
		const endTileId = (event.target as HTMLDivElement).id;

		const { startTile, endTile } = findTiles(startTileId, endTileId);

		endTile.style.opacity = "";
		toggleTileGrid(false);

		swapTiles(startTile, endTile);
		evaluateTileOrder();

		event.preventDefault();
	};

	tile.ontouchstart = (event: TouchEvent): void => {
		toggleTileGrid(true);

		event.preventDefault();
	};

	tile.ontouchend = (event: TouchEvent): void => {
		const [endX, endY] = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];

		const startTile = <HTMLDivElement>event.target;
		const endTile = <HTMLDivElement>document.elementFromPoint(endX, endY);

		toggleTileGrid(false);

		if (!endTile || endTile.tagName !== "DIV" || typeof parseInt(endTile.id, 10) !== "number") {
			return;
		}

		swapTiles(startTile, endTile);
		evaluateTileOrder();
	};
};

const findTiles = (startTileId: string, endTileId: string): { startTile: HTMLDivElement; endTile: HTMLDivElement } => {
	let startTileIndex = -1;
	let endTileIndex = -1;

	refs.imageContainer.childNodes.forEach((node, i) => {
		const tile = <HTMLDivElement>node;
		if (tile.id === startTileId) {
			startTileIndex = i;
		}
		if (tile.id === endTileId) {
			endTileIndex = i;
		}
	});

	const startTile = <HTMLDivElement>refs.imageContainer.childNodes[startTileIndex];
	const endTile = <HTMLDivElement>refs.imageContainer.childNodes[endTileIndex];

	return { startTile, endTile };
};

const swapTiles = (tile1: HTMLDivElement, tile2: HTMLDivElement): void => {
	const next2 = tile2.nextSibling;

	if (next2 === tile1) {
		refs.imageContainer.insertBefore(tile1, tile2);
	} else {
		refs.imageContainer.insertBefore(tile2, tile1);
		refs.imageContainer.insertBefore(tile1, next2);
	}
};

const toggleTileGrid = (shouldShow: boolean): void => {
	const tiles = <HTMLDivElement[]>Array.from(refs.imageContainer.childNodes);
	tiles.forEach(tile => {
		if (shouldShow) {
			tile.style.border = "1px solid #fff";
		} else {
			tile.style.border = "";
		}
	});
};

const evaluateTileOrder = (): void => {
	const tiles = <HTMLDivElement[]>Array.from(refs.imageContainer.childNodes);
	if (tiles.every((tile, i) => parseInt(tile.id, 10) === i)) {
		alert("Congratulations, all tiles are in order!");
	}
};
