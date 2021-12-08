import { refs } from "../refs.js";
import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, swapTiles, toggleTileGrid, unsetDragTile, wasDroppedOnTile } from "./helpers.js";
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
    var _a;
    window.removeEventListener("mousemove", onMouseDownMove);
    window.removeEventListener("mouseup", onMouseUp);
    toggleTileGrid(false);
    unsetDragTile();
    const { pageX: endX, pageY: endY } = event;
    const [, endTile] = document.elementsFromPoint(endX, endY);
    if (!wasDroppedOnTile(endTile)) {
        return;
    }
    const startTileContainer = (_a = refs.dragTile) === null || _a === void 0 ? void 0 : _a.parentElement;
    const endTileContainer = endTile.parentElement;
    swapTiles(startTileContainer, endTileContainer);
    setTimeout(evaluateTileOrder);
};
