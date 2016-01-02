/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//requires
var $ = require('jQuery');

$(document).ready(function() {

    $("#startMemory").click(function() {

        console.log("Memory time!");

    });

    $("#startChat").click(function() {

        console.log("Chat away!");

    });

    $("#startMyApp").click(function() {

        console.log("Nonono you don't get to see it yet!");

    });

    $("#menuToggle").click(function(event) {

        event.preventDefault();
        $(".menuList").toggle();

    });

});
