import { refs } from "../refs.js";
import { swapNodes } from "../swap.js";
import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, toggleTileGrid, unsetDragTile, wasDroppedOnTile } from "./helpers.js";
export const addDesktopDragHandlers = (tile) => {
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
    toggleTileGrid(false);
    const { pageX: endX, pageY: endY } = event;
    const startTile = refs.dragTile;
    const [, endTile] = document.elementsFromPoint(endX, endY);
    unsetDragTile();
    if (!wasDroppedOnTile(endTile)) {
        return;
    }
    swapNodes(startTile, endTile);
    setTimeout(evaluateTileOrder);
};
