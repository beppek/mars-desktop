/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

function Memory(currentWin, rows, cols) {

    console.log("Memory time!");

    currentWin.classList.add("memoryWindow");

    var i;
    var img;
    var tiles = [];

    for (i = 0; i < rows * cols; i += 1) {
        img = document.createElement("img");
        img.setAttribute("src", "image/0.png");
        currentWin.appendChild(img);

        if ((i + 1) % cols === 0) {
            currentWin.appendChild(document.createElement("br"));
        }
    }

}

module.exports = Memory;
