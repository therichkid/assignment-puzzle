import { throttle } from "../throttle.js";
import { evaluateTileOrder, moveDragTile, setDragTile, swapTiles, toggleTileGrid, unsetDragTile } from "./helpers.js";
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
        const { pageX: endX, pageY: endY } = event.changedTouches[0];
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
};
