/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var $ = require("jQuery");
var About = require("./About");
var Memory = require("./Memory");
var Chat = require("./Chat");

//Global variables
var dragObject;
var xPos;
var yPos;
var zCount = 1;
var top = 10;
var left = 160;
var newWindow;

/**
 *
 * This module opens a new app window
 * @constructor
 * @param {string} name of app that opens in the window
 * */
function Window(app) {

    var _this = this;

    //Check for inserted element to the DOM and assign z-index to 3 to bring to front
    $(document).on("DOMNodeInserted", function(e) {
        if (e.target.className === "window") {
            newWindow = e.target;
            //_this.initApp(app, e.target);
            var windows = $(".window");
            if (windows.length === 1) {
                top = 10;
                left = 160;
            }
            zCount += 1;
            e.target.style.zIndex = zCount;
            e.target.style.top = top + "px";
            e.target.style.left = left + "px";
        }
    });

    //Create window from template
    var template = document.querySelector("#windowTemplate");
    var tClone = document.importNode(template.content, true);

    var appIcon = tClone.querySelectorAll(".appIcon")[0];

    appIcon.appendChild(document.createTextNode(app));

    $("#workspace").append(tClone);

    top += 10;
    left += 10;

    $(".closeWindow").click(function() {

        $(this).parent().parent().remove();

    });

    this.addListeners();
    this.initApp(app, newWindow);

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

        zCount += 1;
        $(this).css("z-index", zCount);
        //$(this).siblings(".window").css("z-index", 1);

    });

    window.addEventListener("mouseup", function() {

        _this.drop();

    }, false);

};

Window.prototype.initApp = function(app, currentWin) {

    switch (app) {

        case "About":
            new About(currentWin);
            break;
        case "Chat":
            new Chat(currentWin);
            break;
        case "Memory":
            new Memory(currentWin);

    }

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

    dragObject.style.opacity = 0.9;
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

    if (typeof dragObject !== "undefined") {

        dragObject.style.opacity = 1;

        window.removeEventListener("mousemove", _this.drag, true);

    }

};

module.exports = Window;
