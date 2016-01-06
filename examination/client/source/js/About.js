/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

function About(currentWin) {

    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];
    winWorkSpace.appendChild(document.createTextNode("Skapad av Beppe Karlsson"));

}

module.exports = About;
