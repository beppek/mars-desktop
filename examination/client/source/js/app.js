/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//requires
var $ = require('jQuery');
var OpenWindow = require("./openWindow");

//event listeners
$(document).ready(function() {

    $("#startMemory").click(function() {

        var openWindow = new OpenWindow();
        console.log("Memory time!");

    });

    $("#startChat").click(function() {

        var openWindow = new OpenWindow();
        console.log("Chat away!");

    });

    $("#startMyApp").click(function() {

        var openWindow = new OpenWindow();
        console.log("Nonono you don't get to see it yet!");

    });

    $("#menuToggle").click(function(event) {

        event.preventDefault();
        $(".menuList").toggle();

    });

});
