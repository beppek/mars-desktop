/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";


function About(currentWin) {

    currentWin.classList.add("aboutMe");

    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    //Create window from template
    var template = document.querySelector("#aboutContent");
    var tClone = document.importNode(template.content, true);

    //var createdByPTag = document.createElement("p");
    //var createdBy = document.createTextNode("- This personal web desktop app was created by Beppe Karlsson for the final assignment of 1DV022 - Klientbaserad Webbprogrammering.");
    //
    //createdByPTag.classList.add("createdBy");
    //
    //createdByPTag.appendChild(createdBy);

    winWorkSpace.appendChild(tClone);



}

module.exports = About;
