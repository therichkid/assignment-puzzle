import { NUM_COLS } from "./config.js";
import { refs } from "./refs.js";
import { generateTiles } from "./tile.js";
const addImageToDom = () => {
    refs.imageContainer.querySelectorAll("*").forEach(child => child.remove());
    const tiles = generateTiles();
    tiles.forEach(tile => refs.imageContainer.appendChild(tile));
    const img = new Image();
    img.src = refs.imageSelect.value;
    img.onload = () => setImageContainerStyles(img);
};
const shuffleTiles = () => {
    refs.imageContainer.querySelectorAll("*").forEach(child => child.remove());
    let tiles = generateTiles();
    tiles = tiles.sort(() => Math.random() - 0.5);
    tiles.forEach(tile => refs.imageContainer.appendChild(tile));
};
const setImageContainerStyles = (img) => {
    refs.imageContainer.style.width = `${img.naturalWidth}px`;
    refs.imageContainer.style.height = `${img.naturalHeight}px`;
    refs.imageContainer.style.maxHeight = `${(img.naturalHeight / img.naturalWidth) * 100}vw`;
    refs.imageContainer.style.gridTemplateColumns = `repeat(${NUM_COLS}, 1fr)`;
};
window.addEventListener("load", () => {
    refs.imageContainer = document.getElementById("image-container");
    refs.imageSelect = document.getElementById("image-select");
    refs.shuffleButton = document.getElementById("shuffle-button");
    addImageToDom();
    refs.imageSelect.addEventListener("change", addImageToDom);
    refs.shuffleButton.addEventListener("click", shuffleTiles);
});
