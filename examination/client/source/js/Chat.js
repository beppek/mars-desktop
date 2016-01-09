/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var config = require("./config.json");

function Chat(currentWin) {

    this.socket = null;

    currentWin.classList.add("large");

    var template = document.querySelector("#chatContent");
    this.chatDiv = document.importNode(template.content.firstElementChild, true);

    this.chatDiv.addEventListener("keypress", function(event) {

        //Listen for enter key
        if (event.keyCode === 13) {

            this.sendMessage(event.target.value);
            event.target.value = "";
            event.preventDefault();

        }

    }.bind(this));

    currentWin.appendChild(this.chatDiv);

}

Chat.prototype.connect = function() {

    return new Promise(function(resolve, reject) {

        if (this.socket && this.socket.readyState === 1) {

            resolve(this.socket);
            return

        }

        try {

            this.socket = new WebSocket(config.adress);

        }catch (error) {
            reject(error);
        }

        this.socket.addEventListener("open", function() {

            resolve(this.socket);

        }.bind(this));

        this.socket.addEventListener("error", function(event) {

            reject(new Error("Could not connect."));

        }.bind(this));

        this.socket.addEventListener("message", function(event) {

            var message = JSON.parse(event.data);

            if (message.type === "message") {
                this.printMessage(message);
            }

        }.bind(this));

    }.bind(this));

};

Chat.prototype.sendMessage = function(text) {

    var data = {
        type: "message",
        data: text,
        username: "Olle",
        channel: "",
        key: config.key
    };

    this.connect().then(function(socket) {
        socket.send(JSON.stringify(data));
    }).catch(function(error) {
        console.log("Something went wrong", error);
    });
    console.log(text);

};

Chat.prototype.printMessage = function(message) {

    var template = this.chatDiv.querySelectorAll("template")[0];

    var messageDiv = document.importNode(template.content.firstElementChild, true);

    messageDiv.querySelectorAll(".text")[0].textContent = message.data;
    messageDiv.querySelectorAll(".author")[0].textContent = message.username;

    this.chatDiv.querySelectorAll(".messages")[0].appendChild(messageDiv);

};

module.exports = Chat;
