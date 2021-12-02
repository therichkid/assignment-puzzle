import { evaluateTileOrder, swapTiles, toggleTileGrid } from "./drag.js";
import { refs } from "./refs.js";
import { throttle } from "./throttle.js";
export const addMobileDragHandlers = (tile) => {
    tile.ontouchstart = (event) => {
        toggleTileGrid(true);
        const startTile = event.target;
        const { pageX: startX, pageY: startY } = event.changedTouches[0];
        addDragTile(startTile, [startX, startY]);
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
        removeDragTile();
        if (!endTile || endTile.tagName !== "DIV" || typeof parseInt(endTile.id, 10) !== "number") {
            return;
        }
        swapTiles(startTile, endTile);
        setTimeout(evaluateTileOrder);
    };
};
const addDragTile = (tileToClone, [x, y]) => {
    const { width, height } = tileToClone.getBoundingClientRect();
    const dragTile = tileToClone.cloneNode();
    dragTile.id = "drag-tile";
    dragTile.style.left = `${x - width / 2}px`;
    dragTile.style.top = `${y - height / 2}px`;
    dragTile.style.width = `${width}px`;
    dragTile.style.height = `${height}px`;
    refs.imageContainer.appendChild(dragTile);
    refs.dragTile = dragTile;
};
const moveDragTile = ([x, y]) => {
    if (!refs.dragTile) {
        return;
    }
    const { width, height } = refs.dragTile.getBoundingClientRect();
    refs.dragTile.style.left = `${x - width / 2}px`;
    refs.dragTile.style.top = `${y - height / 2}px`;
};
const removeDragTile = () => {
    var _a;
    (_a = refs.dragTile) === null || _a === void 0 ? void 0 : _a.remove();
    refs.dragTile = null;
};
