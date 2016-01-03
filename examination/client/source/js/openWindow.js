/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var $ = require('jQuery');

/**
 *
 * This module opens a new app window
 * @constructor
 * */
function OpenWindow(app) {

    var template = document.querySelector("#windowTemplate");
    var tClone = document.importNode(template.content, true);

    var appIcon = tClone.querySelectorAll(".appIcon")[0];

    appIcon.appendChild(document.createTextNode(app));

    $("#workspace").append(tClone);

    $(".closeWindow").click(function() {

        $(this).parent().parent().remove();

    });

}

module.exports = OpenWindow;

