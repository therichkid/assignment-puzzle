import { refs } from "../refs.js";
import { swapNodes } from "../swap.js";
import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, toggleTileGrid, unsetDragTile, wasDroppedOnTile } from "./helpers.js";
export const addMobileDragHandlers = (tile) => {
    tile.ontouchstart = (event) => {
        toggleTileGrid(true);
        const startTile = event.target;
        const { pageX: startX, pageY: startY } = event.changedTouches[0];
        setDragTile(startTile, [startX, startY]);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
        event.preventDefault();
    };
};
const onTouchMove = throttle((event) => {
    const { pageX: currX, pageY: currY } = event.changedTouches[0];
    moveDragTile([currX, currY]);
}, 20);
const onTouchEnd = (event) => {
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    toggleTileGrid(false);
    const { pageX: endX, pageY: endY } = event.changedTouches[0];
    const startTile = refs.dragTile;
    const [, endTile] = document.elementsFromPoint(endX, endY);
    unsetDragTile();
    if (!wasDroppedOnTile(endTile)) {
        return;
    }
    swapNodes(startTile, endTile);
    setTimeout(evaluateTileOrder);
};
