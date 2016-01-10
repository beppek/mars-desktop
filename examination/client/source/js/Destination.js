/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//requires
var $ = require("jQuery");

function Destination(currentWin) {

    currentWin.classList.add("destinationWindow");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    var template = document.querySelectorAll("#myAppContent")[0].content.firstElementChild;

    var infoBox = document.importNode(template, true);

    var pTag = infoBox.querySelectorAll("p")[0];
    var pClone = pTag.cloneNode(true);

    var firstInfo = document.createTextNode("Nepal has a rather interesting flag, in fact it is the only nation with a flag that is not rectangular in shape but rather made up of two triangles.");
    var firstQuestion = document.createTextNode("The inspiration for the flag comes from the building in this picture. What is this kind of architecture called?");

    var radioTemplate = infoBox.querySelectorAll("template")[0].content.firstElementChild;
    var form = document.importNode(radioTemplate, true);

    var radio1 = form.querySelectorAll("radio");
    radio1.name = "architecture";
    //
    //var radio2 = radio1.cloneNode(true);
    //
    radio1.value = "pagoda";

    console.log(radio1.value);
    //
    //radio2.value = "feng shui";
    //
    //form.appendChild(radio2);

    pTag.appendChild(firstInfo);
    pClone.appendChild(firstQuestion);
    infoBox.appendChild(pClone);
    infoBox.appendChild(form);

    winWorkSpace.appendChild(infoBox);

}

module.exports = Destination;
