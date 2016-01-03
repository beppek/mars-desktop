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
function OpenWindow() {

    var template = document.querySelector("#windowTemplate");
    var tClone = document.importNode(template.content, true);

    $("#workspace").append(tClone);

}

module.exports = OpenWindow;

