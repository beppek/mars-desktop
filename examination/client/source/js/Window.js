/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var $ = require('jQuery');

/**
 *
 * This module opens a new app window
 * @constructor
 * @param {string} name of app that opens in the window
 * */
function Window(app) {

    var template = document.querySelector("#windowTemplate");
    var tClone = document.importNode(template.content, true);

    var appIcon = tClone.querySelectorAll(".appIcon")[0];

    appIcon.appendChild(document.createTextNode(app));

    $("#workspace").append(tClone);

    $(".closeWindow").click(function() {

        $(this).parent().parent().remove();

    });

    this.addListeners();

}

Window.prototype.addListeners = function() {

    $(".window").mousedown(function(event) {

        var dragObject = event.target;
        this.drag(dragObject);

    }.bind(this));

    window.addEventListener("mouseup", this.mouseUp, false);

};

Window.prototype.drag = function(dragObject) {

    console.log(dragObject);

};

module.exports = Window;

