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

        new OpenWindow("Memory");
        //new Memory();

    });

    $("#startChat").click(function() {

        new OpenWindow("Chat");
        //new Chat();

    });

    $("#startMyApp").click(function() {

        new OpenWindow("MyApp");
        console.log("Nonono you don't get to see it yet!");

    });

    $("#showAbout").click(function() {

        new OpenWindow("About");
        //new About();

    });

    $("#menuToggle").click(function(event) {

        $(this).toggleClass('open');
        event.preventDefault();
        $(".menuList").toggle();

    });

});
