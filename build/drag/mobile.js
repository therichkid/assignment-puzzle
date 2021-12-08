import { evaluateTileOrder, swapTiles, toggleTileGrid } from "./drag.js";
import { refs } from "../refs.js";
import { throttle } from "../throttle.js";
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
export const setDragTile = (tile, [x, y]) => {
    const { width, height } = tile.getBoundingClientRect();
    tile.style.position = "fixed";
    tile.style.left = `${x - width / 2}px`;
    tile.style.top = `${y - height / 2}px`;
    tile.style.width = `${width}px`;
    tile.style.height = `${height}px`;
    refs.dragTile = tile;
};
export const moveDragTile = ([x, y]) => {
    const tile = refs.dragTile;
    if (!tile) {
        return;
    }
    const width = parseInt(tile.style.width, 10);
    const height = parseInt(tile.style.height, 10);
    tile.style.left = `${x - width / 2}px`;
    tile.style.top = `${y - height / 2}px`;
};
export const unsetDragTile = () => {
    const tile = refs.dragTile;
    if (!tile) {
        return;
    }
    tile.style.position = tile.style.left = tile.style.top = "";
    tile.style.width = "100%";
    tile.style.height = "100%";
    refs.dragTile = null;
};
