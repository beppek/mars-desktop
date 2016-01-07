/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict"

function Memory(currentWin, rows, cols) {

    var _this = this;

    console.log("Memory time!");

    currentWin.classList.add("memoryWindow");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    var i;
    var a;
    var tiles = [];

    tiles = this.getPictures(rows, cols);

    var template = document.querySelectorAll("#memoryContent")[0].content.firstElementChild;

    tiles.forEach(function(tile, index) {

        a = document.importNode(template, true);

        winWorkSpace.appendChild(a);

        a.addEventListener("click", function(event) {

            event.preventDefault();

            var img = event.target.nodeName === "IMG" ? event.target : event.target.firstElementChild;

            _this.turnBrick(tile, index, img);

        });

        if ((index + 1) % cols === 0) {
            winWorkSpace.appendChild(document.createElement("br"));
        }
    });

}

Memory.prototype.getPictures = function(rows, cols) {

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

    return arr;

};

Memory.prototype.turnBrick = function(tile, index, img) {

    img.src = "image/" + tile + ".png"

};
module.exports = Memory;
