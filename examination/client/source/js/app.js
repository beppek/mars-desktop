/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//requires
var $ = require('jQuery');
var OpenWindow = require("./Window");

//event listeners
$(document).ready(function() {

    $("#startMemory").click(function() {

        new OpenWindow("Memory");
        console.log("Memory time!");

    });

    $("#startChat").click(function() {

        new OpenWindow("Chat");
        console.log("Chat away!");

    });

    $("#startMyApp").click(function() {

        new OpenWindow("MyApp");
        console.log("Nonono you don't get to see it yet!");

    });

    $("#menuToggle").click(function(event) {

        event.preventDefault();
        $(".menuList").toggle();

    });

});
