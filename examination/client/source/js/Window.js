/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var $ = require('jQuery');

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

    $(document).on('DOMNodeInserted', function(e) {
        if (e.target.className === 'window') {
            e.target.style.zIndex = 3;
        }
    });

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

    var that = this;

    $(".statusbar").mousedown(function(event) {

        dragObject = event.target.parentNode;
        that.mouseDown(event);

    });

    $(".window").mousedown(function() {

        $(this).css("z-index", 2);
        $(this).siblings(".window").css("z-index", 1);
        console.log(this);

    });

    window.addEventListener("mouseup", function() {

        that.drop();

    }, false);

};

/**
 *
 * Fires an eventlistener to listen for the mouse to move
 * @memberof Window.prototype
 * */
Window.prototype.mouseDown = function(event) {

    var that = this;

    xPos = event.clientX - dragObject.offsetLeft;
    yPos = event.clientY - dragObject.offsetTop;

    window.addEventListener('mousemove', that.drag, true);

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

    var that = this;

    window.removeEventListener('mousemove', that.drag, true);

};

module.exports = Window;
