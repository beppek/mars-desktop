/**
 *
 * @author: leitet
 * @author: beppek (edits and addons)
 * @version: 1.0.0
 *
 * */

"use strict";

//Requires
var config = require("./config.json");

/**
 *
 * This is the constructor of the chat app taking one argument for window to display in
 * @constructor
 * @param {object} currentWin - the window to display the chat
 * */
function Chat(currentWin) {

    this.socket = null;

    //localStorage.removeItem("username");

    //Checks if username is set in local storage
    if (localStorage.username) {

        //Assign username from local storage
        this.username = localStorage.username;

    } else {

        //if not, set username
        this.selectUsername(currentWin);
        return;

    }

    //Set window class and find div to clone into
    currentWin.classList.add("large");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    //Check if menu already present before adding
    if (!currentWin.querySelectorAll(".winMenu")[0]) {

        //Insert window menu and populate
        var menuTemplate = currentWin.querySelector("#winMenu");
        var menuDiv = document.importNode(menuTemplate.content.firstElementChild, true);

        var menuItem = menuDiv.querySelectorAll(".winMenuItem")[0];

        menuItem.textContent = "Change Username";

        menuItem.addEventListener("click", function(event) {

            event.preventDefault();
            this.selectUsername(currentWin);
            return;

        }.bind(this));

        winWorkSpace.parentNode.insertBefore(menuDiv, winWorkSpace);

    }

    //Find template and import
    var template = document.querySelector("#chatContent");
    this.chatDiv = document.importNode(template.content.firstElementChild, true);

    this.chatDiv.addEventListener("keypress", function(event) {

        //Listen for enter key
        if (event.keyCode === 13) {

            //Pass message over to function
            this.sendMessage(event.target.value);
            event.target.value = "";
            event.preventDefault();

        }

    }.bind(this));

    //Insert into DOM
    winWorkSpace.appendChild(this.chatDiv);

}

/**
 *
 * This function allows you to set the username
 * @memberof Chat.prototype
 * @param {object} currentWin - Window to display in
 * */
Chat.prototype.selectUsername = function(currentWin) {

    //If username is set remove to set new as the function was called to change user name
    if (localStorage.username) {

        localStorage.removeItem("username");

    }

    //Revert to default window size
    currentWin.classList.remove("large");

    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    //Remove content from window
    while (winWorkSpace.firstChild) {
        winWorkSpace.removeChild(winWorkSpace.firstChild);
    }

    //Find template and div to clone into
    var template = document.querySelector("#chatContent");

    var selectUsername = document.importNode(template.content.lastElementChild, true);

    //Event listener in form submit
    selectUsername.addEventListener("submit", function(event) {

        event.preventDefault();

        //Set username in local storage
        localStorage.setItem("username", event.target.firstElementChild.value);

        winWorkSpace.removeChild(selectUsername);

        //Call constructor
        new Chat(currentWin);

    }.bind(this));

    winWorkSpace.appendChild(selectUsername);

};

/**
 *
 * This function connects to the web socket
 * @memberof Chat.prototype
 * */
Chat.prototype.connect = function() {

    //Promises allows you to do stuff before handshake has been made and connection established
    return new Promise(function(resolve, reject) {

        if (this.socket && this.socket.readyState === 1) {

            resolve(this.socket);
            return

        }

        //Some error handling in case something goes wrong
        try {

            this.socket = new WebSocket(config.adress);

        }catch (error) {
            reject(error);
        }

        this.socket.addEventListener("open", function() {

            resolve(this.socket);

        }.bind(this));

        //Throw error in case connection fails
        this.socket.addEventListener("error", function() {

            reject(new Error("Could not connect."));

        }.bind(this));

        //Listen for messages
        this.socket.addEventListener("message", function(event) {

            var message = JSON.parse(event.data);

            //Ignore "heartbeat" from server
            if (message.type === "message") {

                this.printMessage(message);

            }

        }.bind(this));

    }.bind(this));

};

/**
 *
 * This function sends message
 * @memberof Chat.prototype
 * @param {string} text - the message text to send
 * */
Chat.prototype.sendMessage = function(text) {

    //Create data object and get key from config file
    var data = {
        type: "message",
        data: text,
        username: this.username,
        channel: "",
        key: config.key
    };

    //Check for connection before sending
    this.connect().then(function(socket) {

        socket.send(JSON.stringify(data));

    }).catch(function(error) {

        //Log error
        console.log("Something went wrong", error);

    });

};

/**
 *
 * This function prints the message
 * @memberof Chat.prototype
 * @param {object} message - Message object recieved from server
 * */
Chat.prototype.printMessage = function(message) {

    //Find template and import
    var template = this.chatDiv.querySelectorAll("template")[0];
    var messageDiv = document.importNode(template.content.firstElementChild, true);

    //Assumes username is unique
    if (message.username === this.username) {

        messageDiv.classList.add("me");

    }

    var timeStamp = this.timeStamp();

    //Print username, message and timestamp, insert into DOM
    messageDiv.querySelectorAll(".author")[0].textContent = message.username;
    messageDiv.querySelectorAll(".text")[0].textContent = message.data;
    messageDiv.querySelectorAll(".time")[0].textContent = timeStamp;
    this.chatDiv.querySelectorAll(".messages")[0].appendChild(messageDiv);

    var messagesDiv = this.chatDiv.firstElementChild;

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

};

/**
 *
 * This function returns a timestamp for the message
 * @memberof Chat.prototype
 * */
Chat.prototype.timeStamp = function() {

    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var dateObject = new Date();
    var weekday = weekDays[dateObject.getDay()];
    var month = months[dateObject.getMonth()];
    var date = dateObject.getDate();
    var hour = dateObject.getHours();
    var minute = dateObject.getMinutes();

    return weekday + " " + month + " " + date + ", " + hour + ":" + minute;

};

module.exports = Chat;
