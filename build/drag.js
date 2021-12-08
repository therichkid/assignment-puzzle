import { moveDragTile, setDragTile, unsetDragTile } from "./mobile-drag.js";
import { refs } from "./refs.js";
import { throttle } from "./throttle.js";
export const addDragHandlers = (tile) => {
    tile.onmousedown = (event) => {
        toggleTileGrid(true);
        const startTile = event.target;
        const { pageX: startX, pageY: startY } = event;
        setDragTile(startTile, [startX, startY]);
        window.addEventListener("mousemove", onMouseDownMove);
        window.addEventListener("mouseup", onMouseUp);
        event.preventDefault();
    };
};
const onMouseDownMove = throttle((event) => {
    const { pageX: currX, pageY: currY } = event;
    moveDragTile([currX, currY]);
}, 20);
const onMouseUp = (event) => {
    window.removeEventListener("mousemove", onMouseDownMove);
    window.removeEventListener("mouseup", onMouseUp);
    const { pageX: endX, pageY: endY } = event;
    const startTile = event.target;
    const [, endTile] = document.elementsFromPoint(endX, endY);
    toggleTileGrid(false);
    unsetDragTile();
    if (!endTile || endTile.tagName !== "DIV" || typeof parseInt(endTile.id, 10) !== "number") {
        return;
    }
    const startTileContainer = startTile.parentElement;
    const endTileContainer = endTile.parentElement;
    swapTiles(startTileContainer, endTileContainer);
    setTimeout(evaluateTileOrder);
};
export const swapTiles = (tile1, tile2) => {
    const next2 = tile2.nextSibling;
    if (next2 === tile1) {
        refs.imageContainer.insertBefore(tile1, tile2);
    }
    else {
        refs.imageContainer.insertBefore(tile2, tile1);
        refs.imageContainer.insertBefore(tile1, next2);
    }
};
export const toggleTileGrid = (shouldShow) => {
    const tiles = Array.from(refs.imageContainer.childNodes);
    tiles.forEach(tile => {
        if (shouldShow) {
            tile.style.border = "1px solid #fff";
        }
        else {
            tile.style.border = "";
        }
    });
};
export const evaluateTileOrder = () => {
    const tiles = Array.from(refs.imageContainer.childNodes);
    if (tiles.every((tile, i) => parseInt(tile.children[0].id, 10) === i)) {
        alert("Congratulations, all tiles are in order!");
    }
};
