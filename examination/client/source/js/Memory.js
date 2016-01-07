/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

/**
 * This function creates an instance of the memory game taking 3 parameters
 * @constructor
 * @param {Object} currentWin - the window the game will show in
 * @param {int} rows - number of rows to render
 * @param {int} cols - number of columns to render
 * */
function Memory(currentWin, rows, cols) {

    var turn1;
    var turn2;
    var prevTile;
    var pairs = 0;
    var totalPairs;
    var tries = 0;

    totalPairs = (rows * cols) / 2;

    console.log("Memory time!");

    currentWin.classList.add("memoryWindow");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    var a;
    var tiles = getPictures(rows, cols);

    var template = document.querySelectorAll("#memoryContent")[0].content.firstElementChild;

    tiles.forEach(function(tile, index) {

        a = document.importNode(template, true);

        winWorkSpace.appendChild(a);

        a.addEventListener("click", function(event) {

            event.preventDefault();

            var img;
            if (event.target.nodeName === "IMG") {
                img = event.target;
            }else {
                img = event.target.firstElementChild;
            }

            turnBrick(tile, img);

        });

        if ((index + 1) % cols === 0) {
            winWorkSpace.appendChild(document.createElement("br"));
        }
    });

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

        return arr;

    }

    function turnBrick(tile, img) {

        if (turn2) {
            return;
        }

        img.src = "image/" + tile + ".png";

        if (!turn1) {

            //first brick
            turn1 = img;
            prevTile = tile;

        }else {

            //second brick
            if (img === turn1) {
                return;
            }

            tries += 1;

            turn2 = img;

            if (tile === prevTile) {

                //found pair
                pairs += 1;

                if (pairs === totalPairs) {
                    console.log("Yay! Only took: " + tries + " tries!");
                }

                setTimeout(function() {

                    turn1.parentNode.classList.add("pairedBrick");
                    turn2.parentNode.classList.add("pairedBrick");

                    turn1 = null;
                    turn2 = null;

                }, 250);

            }else {

                setTimeout(function() {

                    turn1.src = "image/0.png";
                    turn2.src = "image/0.png";

                    turn1 = null;
                    turn2 = null;

                }, 500);

            }

        }

    }

}

module.exports = Memory;
