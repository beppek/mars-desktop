/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var $ = require("jQuery");

//Global variables
var dragObject;
var xPos;
var yPos;

/**
 *
 * This module opens a new app window
 * @constructor
 * @param {string} name of app that opens in the window
 * */
function Window(app) {

    //
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

/**
 *
 * Adds event listeners to the window and global window object
 * @memberof Window.prototype
 * */
Window.prototype.addListeners = function() {

    var _this = this;

    var statusbar = document.querySelectorAll(".statusbar");

    $(".statusbar").mousedown(function(event) {

        if (event.target.className === "statusbar") {

            dragObject = event.target.parentNode;
            _this.mouseDown(event);

        }else if (event.target.className === "appIcon" || event.target.className === "closeWindow") {

            dragObject = event.target.parentNode.parentNode;
            _this.mouseDown(event);

        }

    });

    $(".window").mousedown(function() {

        $(this).css("z-index", 2);
        $(this).siblings(".window").css("z-index", 1);

    });

    window.addEventListener("mouseup", function() {

        _this.drop();

    }, false);

};

/**
 *
 * Fires an eventlistener to listen for the mouse to move
 * @memberof Window.prototype
 * */
Window.prototype.mouseDown = function(event) {

    var _this = this;

    xPos = event.clientX - dragObject.offsetLeft;
    yPos = event.clientY - dragObject.offsetTop;

    window.addEventListener("mousemove", _this.drag, true);

};

/**
 *
 * Drags the selected object around by following the mouse
 * @memberof Window.prototype
 * @param {event} event that triggers this function
 * */
Window.prototype.drag = function(event) {

    event.stopPropagation();

    dragObject.style.position = "absolute";
    dragObject.style.top = (event.clientY - yPos) + "px";
    dragObject.style.left = (event.clientX - xPos) + "px";

};

/**
 *
 * Drops the selected element
 * @memberof Window.prototype
 * */
Window.prototype.drop = function() {

    var _this = this;

    window.removeEventListener("mousemove", _this.drag, true);

};

module.exports = Window;
