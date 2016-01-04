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

/**
 *
 * Adds event listeners to the window and global window object
 * @memberof Window.prototype
 * */
Window.prototype.addListeners = function() {

    var that = this;

    $(".statusbar").mousedown(function(event) {

        dragObject = event.target.parentNode;
        that.mouseDown();

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
Window.prototype.mouseDown = function() {

    var that = this;

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
    dragObject.style.top = event.clientY + "px";
    dragObject.style.left = event.clientX + "px";

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
