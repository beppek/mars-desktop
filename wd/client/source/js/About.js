/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

/**
 * This function prints the about info from template
 * @constructor
 * @param {object} currentWin - the window to display info
 * */
function About(currentWin) {

    currentWin.classList.add("aboutMe");

    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    //Create window from template
    var template = document.querySelector("#aboutContent");
    var tClone = document.importNode(template.content, true);

    winWorkSpace.appendChild(tClone);

}

module.exports = About;
