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

//event listeners
$(document).ready(function() {

    //Check for inserted element to the DOM and assign z-index to 3 to bring to front
    $(document).on("DOMNodeInserted", function(e) {
        if (e.target.className === "window") {
            e.target.style.zIndex = 2;
        }
    });

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

        $(this).toggleClass('open');
        event.preventDefault();
        $(".menuList").toggle();

    });

});
