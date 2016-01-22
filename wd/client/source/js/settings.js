/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

var $ = require("jQuery");

/**
 * This function builds the settings menu
 * @constructor
 * @param {object} currentWin - the window to display settings
 * */
function Settings(currentWin) {

    currentWin.classList.add("settingsWin");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    //Create window from template
    var template = document.querySelector("#settingsContent");
    var tClone = document.importNode(template.content, true);

    var list = tClone.querySelectorAll(".bgImg")[0];

    $(list).change(function() {

        var bg;

        $("select option:selected" ).each(function() {

            bg = $(this).text();
            //background.style.backgroundImage = "url('/image/bg" + bg + ".jpg')";
            $("#workspace").removeClass();
            $("#workspace").addClass("bg" + bg);
            localStorage.setItem("bgimg", bg);

        });



    }.bind(this));

    winWorkSpace.appendChild(tClone);

}

module.exports = Settings;
