// ==UserScript==
// @name         r/placeDE Template
// @namespace    http://tampermonkey.net/
// @version      9.0
// @description  try to take over the canvas!
// @author       placeDE Devs
// @match        https://garlic-bread.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @updateURL    https://github.com/PlaceDE-Official/place-overlay/raw/main/src/scripts/placeDE-overlay.user.js
// @downloadURL  https://github.com/PlaceDE-Official/place-overlay/raw/main/src/scripts/placeDE-overlay.user.js
// @grant        GM_registerMenuCommand
// ==/UserScript==

var overlayImage = null;
if (window.top !== window.self) {
    window.addEventListener('load', () => {
        const canvasContainer = document.querySelector("garlic-bread-embed").shadowRoot.querySelector("div.layout").querySelector("garlic-bread-canvas").shadowRoot.querySelector("div.container");
        const canvas = canvasContainer.querySelector('canvas');
        overlayImage = document.createElement("img");
        updateImage();
        overlayImage.style = `position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 2000px;pointerEvents: 'none';`;
        canvasContainer.appendChild(overlayImage);

        GM_registerMenuCommand("Canvas Speichern", function(){
            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = `canvas-${(Date.now() / 1000).toFixed(0)}.png`;
            a.click();
        });
    }, false);
}

function updateImage() {
    overlayImage.src = "https://place.army/overlay_target.png?" + Date.now()
}

setInterval(function () {overlayImage.src = "https://place.army/overlay_target.png?" + Date.now()}, 30000);
