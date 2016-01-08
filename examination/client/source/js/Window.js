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
var top = 20;
var left = 170;
var newWindow;

/**
 *
 * This module opens a new app window
 * @constructor
 * @param {string} app - name of app that opens in the window
 * */
function Window(app) {

    //Check for inserted element to the DOM and assign z-index to bring to front
    //position top and left
    $(document).on("DOMNodeInserted", function(e) {
        if (e.target.className === "window") {
            newWindow = e.target;

            //_this.initApp(app, e.target);
            var windows = $(".window");
            if (windows.length === 1) {
                top = 20;
                left = 170;
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

    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", "image/" + app + ".png");
    appIcon.appendChild(iconImg);

    $("#workspace").append(tClone);

    top += 15;
    left += 15;

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

    });

    window.addEventListener("mouseup", function() {

        _this.drop();

    }, false);

};

/**
 *
 * Initializes the app that will run in the window
 * @memberof Window.prototype
 * @param {string} app - the app that will start
 * @param {object} currentWin - the window that just opened
 * */
Window.prototype.initApp = function(app, currentWin) {

    switch (app) {

        case "about":

            About(currentWin);
            break;

        case "chat":

            new Chat(currentWin);
            break;

        case "memory":

            var template = document.querySelectorAll("#memoryContent")[0].content.firstElementChild.nextElementSibling;
            var div = document.importNode(template, true);

            currentWin.appendChild(div);

            currentWin.classList.add("selectSize");

            var aTags = div.getElementsByTagName("a");

            $(aTags).click(function(event) {

                event.preventDefault();
                var size = $(this).text();

                if (size === "Large") {

                    Memory(currentWin, 4, 4);
                    $(aTags).remove();

                }else if (size === "Medium") {

                    Memory(currentWin, 2, 4);
                    $(aTags).remove();

                }else {

                    Memory(currentWin, 2, 2);
                    $(aTags).remove();

                }
            });

            break;
    }

};

/**
 *
 * Fires an event listener to listen for the mouse to move
 * @memberof Window.prototype
 * @param {object} event - the mousedown event that triggered the function
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
 * @param {object} event that triggers this function
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
