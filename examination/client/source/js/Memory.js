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
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    var i;
    var img;
    var tiles = [];
    tiles = getPictures(rows, cols);

    var template = document.querySelectorAll("#memoryContent")[0].content.firstElementChild;

    for (i = 0; i < rows * cols; i += 1) {

        img = document.importNode(template, true);

        winWorkSpace.appendChild(img);

        img.addEventListener("click", function () {

            console.log(i);

        });

        if ((i + 1) % cols === 0) {
            winWorkSpace.appendChild(document.createElement("br"));
        }
    }

    function getPictures(rows, cols) {

        var arr = [];
        var i;
        for (i = 1; i <= (rows * cols) / 2; i += 1) {
            arr.push(i);
            arr.push(i);
        }

        for (i = arr.length - 1; i > 0; i -= 1) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

    }

}

module.exports = Memory;
