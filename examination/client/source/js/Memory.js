/**
 *
 * @author: leitet
 * @author: beppek (edits and addons)
 * @version: 1.0.0
 *
 * */

"use strict";

//Require
var $ = require("jQuery");

/**
 * This function creates an instance of the memory game taking 3 parameters
 * @constructor
 * @param {Object} currentWin - the window the game will show in
 * @param {int} rows - number of rows to render
 * @param {int} cols - number of columns to render
 * */
function Memory(currentWin, rows, cols) {

    currentWin.classList.remove("selectSize");

    //Sets size of window for smaller than large
    if (rows * cols === 16) {
        currentWin.classList.add("large");
    }
    else if (rows * cols === 8) {
        currentWin.classList.add("medium");
    }else if (rows * cols === 4) {
        currentWin.classList.add("small");
    }

    var turn1;
    var turn2;
    var prevTile;
    var pairs = 0;
    var totalPairs;
    var tries = 0;

    totalPairs = (rows * cols) / 2;

    currentWin.classList.add("memoryWindow");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];
    winWorkSpace.classList.add("memoryGame");

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

    /**
     *
     * This function shuffles the array of memory bricks
     * @function
     * */
    function getPictures() {

        var arr = [];
        var i;
        for (i = 1; i <= totalPairs; i += 1) {
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

    /**
     *
     * This function turns the bricks when clicked
     * taking parameters for tile and image
     * @function
     * @param {object} tile - the tile that was clicked
     * @param {object} img - the image
     * */
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

                //Win condition
                if (pairs === totalPairs) {

                    //Remove content from window
                    while (winWorkSpace.firstChild) {
                        winWorkSpace.removeChild(winWorkSpace.firstChild);
                    }

                    //Remove size class from window
                    currentWin.classList.remove("small");
                    currentWin.classList.remove("medium");
                    currentWin.classList.remove("large");

                    //Add class
                    currentWin.classList.add("selectSize");

                    //Import template to display result
                    var template = document.querySelectorAll("#memoryContent")[0].content.lastElementChild;
                    var div = document.importNode(template, true);
                    winWorkSpace.appendChild(div);
                    var text = document.createTextNode("You completed the game in " + tries + " tries!");

                    var p = div.querySelectorAll("p")[0];
                    p.appendChild(text);

                    var playAgain = div.querySelectorAll("a")[0];

                    playAgain.addEventListener("click", function(event) {

                        //Remove class
                        winWorkSpace.classList.remove("memoryGame");

                        //Remove content from window
                        while (winWorkSpace.firstChild) {
                            winWorkSpace.removeChild(winWorkSpace.firstChild);
                        }

                        event.preventDefault();

                        //Import template to select size/difficulty
                        var sizeTemplate = document.querySelectorAll("#memoryContent")[0].content.firstElementChild.nextElementSibling;
                        var div = document.importNode(sizeTemplate, true);

                        //Add template
                        winWorkSpace.appendChild(div);

                        var aTags = div.getElementsByTagName("a");

                        $(aTags).click(function(event) {

                            event.preventDefault();
                            var size = $(this).text();

                            //Compare to find size to play
                            if (size === "Large") {

                                new Memory(currentWin, 4, 4);
                                $(aTags).remove();

                            }else if (size === "Medium") {

                                new Memory(currentWin, 2, 4);
                                $(aTags).remove();

                            }else {

                                new Memory(currentWin, 2, 2);
                                $(aTags).remove();

                            }

                            //Remove div after select
                            winWorkSpace.removeChild(div);

                        });

                    });

                }

                //Timeout function to hide paired bricks
                setTimeout(function() {

                    turn1.parentNode.classList.add("pairedBrick");
                    turn2.parentNode.classList.add("pairedBrick");

                    turn1 = null;
                    turn2 = null;

                }, 250);

            }else {

                //Timeout function to turn bricks back around
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
