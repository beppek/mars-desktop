/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

function Chat(currentWin) {

    currentWin.classList.add("large");

    var template = document.querySelector("#chatContent");
    var chatDiv = document.importNode(template.content.firstElementChild, true);

    chatDiv.addEventListener("keypress", function(event) {

        //Listen for enter key
        if (event.keyCode === 13) {

            //Send message
            event.target.value = "";
            event.preventDefault();

        }

    });

    currentWin.appendChild(chatDiv);

}

Chat.prototype.connect = function() {



};

Chat.prototype.sendMessage = function() {



};

Chat.prototype.printMessage = function() {



};

module.exports = Chat;
