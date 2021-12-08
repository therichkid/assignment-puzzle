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
        event.preventDefault();
    };
    tile.ontouchmove = throttle((event) => {
        const { pageX: currX, pageY: currY } = event.changedTouches[0];
        moveDragTile([currX, currY]);
    }, 20);
    tile.ontouchend = (event) => {
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
};
