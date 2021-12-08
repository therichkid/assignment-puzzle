import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, swapTiles, toggleTileGrid, unsetDragTile } from "./helpers.js";
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
