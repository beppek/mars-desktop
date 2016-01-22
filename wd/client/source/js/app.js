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

//event listeners to start the apps and toggle menu
$(document).ready(function() {

    $("#startMemory").click(function(event) {

        event.preventDefault();
        new OpenWindow("memory");

    });

    $("#startChat").click(function(event) {

        event.preventDefault();
        new OpenWindow("chat");

    });

    $("#startMyApp").click(function(event) {

        event.preventDefault();
        new OpenWindow("travel");

    });

    $("#showAbout").click(function(event) {

        event.preventDefault();
        new OpenWindow("about");

    });

    $("#settings").click(function(event) {

        event.preventDefault();
        new OpenWindow("settings");

    });

    $("#menuToggleLink").click(function(event) {

        event.preventDefault();
        $(".menuList").toggle(300);
        $("#menuToggle").toggleClass("open");

    });

});
