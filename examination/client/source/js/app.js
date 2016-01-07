/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//requires
var $ = require("jQuery");
var OpenWindow = require("./Window");
var Memory = require("./Memory");
var Chat = require("./Chat");
var About = require("./About");

//event listeners
$(document).ready(function() {

    //$(document).on("DOMNodeInserted", function(e) {
    //    if (e.target.className === "window") {
    //
    //    }
    //});

    $("#startMemory").click(function() {

        new OpenWindow("memory");
        //new Memory();

    });

    $("#startChat").click(function() {

        new OpenWindow("chat");
        //new Chat();

    });

    $("#startMyApp").click(function() {

        new OpenWindow("game");
        console.log("Nonono you don't get to see it yet!");

    });

    $("#showAbout").click(function() {

        new OpenWindow("about");
        //new About();

    });

    $("#menuToggle").click(function(event) {

        event.preventDefault();
        $(".menuList").toggle(300);
        $(this).toggleClass('open');

    });

});
