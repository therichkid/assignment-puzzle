import { refs } from "./refs.js";
export const addDragHandlers = (tile) => {
    tile.setAttribute("draggable", "true");
    tile.ondragstart = (event) => {
        var _a;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", tile.id);
        toggleTileGrid(true);
    };
    tile.ondragenter = (event) => {
        event.target.style.opacity = "0.25";
    };
    tile.ondragover = (event) => {
        event.preventDefault();
    };
    tile.ondragleave = (event) => {
        event.target.style.opacity = "";
    };
    tile.ondrop = (event) => {
        var _a;
        const startTileId = ((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain")) || "";
        const endTileId = event.target.id;
        const { startTile, endTile } = findTiles(startTileId, endTileId);
        endTile.style.opacity = "";
        toggleTileGrid(false);
        swapTiles(startTile, endTile);
        evaluateTileOrder();
        event.preventDefault();
    };
    tile.ontouchstart = (event) => {
        toggleTileGrid(true);
        event.preventDefault();
    };
    tile.ontouchend = (event) => {
        const [endX, endY] = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
        const startTile = event.target;
        const endTile = document.elementFromPoint(endX, endY);
        toggleTileGrid(false);
        if (!endTile || endTile.tagName !== "DIV" || typeof parseInt(endTile.id, 10) !== "number") {
            return;
        }
        swapTiles(startTile, endTile);
        evaluateTileOrder();
    };
};
const findTiles = (startTileId, endTileId) => {
    let startTileIndex = -1;
    let endTileIndex = -1;
    refs.imageContainer.childNodes.forEach((node, i) => {
        const tile = node;
        if (tile.id === startTileId) {
            startTileIndex = i;
        }
        if (tile.id === endTileId) {
            endTileIndex = i;
        }
    });
    const startTile = refs.imageContainer.childNodes[startTileIndex];
    const endTile = refs.imageContainer.childNodes[endTileIndex];
    return { startTile, endTile };
};
const swapTiles = (tile1, tile2) => {
    const next2 = tile2.nextSibling;
    if (next2 === tile1) {
        refs.imageContainer.insertBefore(tile1, tile2);
    }
    else {
        refs.imageContainer.insertBefore(tile2, tile1);
        refs.imageContainer.insertBefore(tile1, next2);
    }
};
const toggleTileGrid = (shouldShow) => {
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
const evaluateTileOrder = () => {
    const tiles = Array.from(refs.imageContainer.childNodes);
    if (tiles.every((tile, i) => parseInt(tile.id, 10) === i)) {
        alert("Congratulations, all tiles are in order!");
    }
};