import { refs } from "../refs.js";
import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, swapTiles, toggleTileGrid, unsetDragTile, wasDroppedOnTile } from "./helpers.js";
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
        var _a;
        toggleTileGrid(false);
        unsetDragTile();
        const { pageX: endX, pageY: endY } = event.changedTouches[0];
        const [, endTile] = document.elementsFromPoint(endX, endY);
        if (!wasDroppedOnTile(endTile)) {
            return;
        }
        const startTileContainer = (_a = refs.dragTile) === null || _a === void 0 ? void 0 : _a.parentElement;
        const endTileContainer = endTile.parentElement;
        swapTiles(startTileContainer, endTileContainer);
        setTimeout(evaluateTileOrder);
    };
};
