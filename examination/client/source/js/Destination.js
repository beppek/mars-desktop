/**
 *
 * @author: beppek
 * @version: 1.0.0
 *
 * */

"use strict";

//requires
var $ = require("jQuery");
var questions = [
    require("./questions/1.json"),
];


function Destination(currentWin) {

    currentWin.classList.add("destinationWindow");
    var winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    var template = document.querySelectorAll("#myAppContent")[0].content;

    this.boxWrapper = document.importNode(template.firstElementChild, true);
    this.contentTemplate = template.querySelectorAll("template")[0].content;
    this.info = document.importNode(this.contentTemplate.firstElementChild, true);
    this.infoPTag = this.info.querySelectorAll("p")[0];
    this.questionDiv = document.importNode(this.contentTemplate.querySelectorAll(".question")[0], true);
    this.answerOptionsDiv = this.questionDiv.querySelectorAll(".answerOptions")[0];
    this.answerOption = this.answerOptionsDiv.querySelectorAll("template")[0].content.firstElementChild;

    winWorkSpace.appendChild(this.boxWrapper);

    if (localStorage.savedgame) {

        var question = localStorage.savedGame;

        this.printInfo(question);

    }else {

        this.printInfo(0);

    }

}

Destination.prototype.printInfo = function(index) {

    this.infoPTag.appendChild(document.createTextNode(questions[index].info));

    var next = this.info.querySelectorAll(".continue")[0].firstElementChild;

    $(next).click(function(event) {

        event.preventDefault();

        console.log("clicked");

        //Remove content from box
        while (this.boxWrapper.firstChild) {
            this.boxWrapper.removeChild(this.boxWrapper.firstChild);
        }

        this.printQuestion(index);

    }.bind(this));

    this.boxWrapper.appendChild(this.info);

};

Destination.prototype.printQuestion = function(index) {

    this.questionDiv.firstElementChild.appendChild(document.createTextNode(questions[index].question));

    this.boxWrapper.appendChild(this.questionDiv);

    questions[index].options.forEach(function(option) {

        //console.log(option);
        var optionTag = document.importNode(this.answerOption, true);
        optionTag.textContent = option.option;

        this.answerOptionsDiv.appendChild(optionTag);

    }.bind(this));

};

Destination.prototype.saveGame = function(index) {



};

module.exports = Destination;
