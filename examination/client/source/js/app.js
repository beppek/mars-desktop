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

    $("#startMemory").click(function() {

        new OpenWindow("memory");

    });

    $("#startChat").click(function() {

        new OpenWindow("chat");

    });

    $("#startMyApp").click(function() {

        new OpenWindow("travel");
        console.log("Nonono you don't get to see it yet!");

    });

    $("#showAbout").click(function() {

        new OpenWindow("about");

    });

    $("#menuToggle").click(function(event) {

        event.preventDefault();
        $(".menuList").toggle(300);
        $(this).toggleClass("open");

    });

});
