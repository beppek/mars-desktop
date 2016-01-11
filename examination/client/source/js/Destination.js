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
    require("./questions/2.json"),
    require("./questions/3.json"),
    require("./questions/4.json"),
    require("./questions/5.json"),
    require("./questions/6.json"),
    require("./questions/7.json")
];


function Destination(currentWin) {

    this.currentWin = currentWin;
    this.currentWin.classList.add("destinationWindow");

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

    this.currentWin.classList.add("question" + index);

    this.infoPTag.appendChild(document.createTextNode(questions[index].info));

    var next = this.info.querySelectorAll(".continue")[0].firstElementChild;

    $(next).click(function(event) {

        event.preventDefault();
        $(next).unbind();

        this.clearDiv(this.boxWrapper);
        this.clearDiv(this.infoPTag);

        this.printQuestion(index);

    }.bind(this));

    this.boxWrapper.appendChild(this.info);

};

Destination.prototype.clearDiv = function(div) {

    //Remove content from div
    while (div.firstChild) {

        div.removeChild(div.firstChild);

    }

};

Destination.prototype.printQuestion = function(index) {

    var questionText = this.questionDiv.firstElementChild;
    questionText.textContent = questions[index].question;

    this.boxWrapper.appendChild(this.questionDiv);

    questions[index].options.forEach(function(option) {

        var optionTag = document.importNode(this.answerOption, true);
        console.log(this.answerOption);
        optionTag.textContent = option.option;

        $(optionTag).click(function(event) {

            event.preventDefault();
            $(optionTag).unbind();

            this.checkAnswer(event.target.textContent, index);
            this.clearDiv(questionText);
            this.clearDiv(this.answerOptionsDiv);

        }.bind(this));

        this.answerOptionsDiv.appendChild(optionTag);

    }.bind(this));

};

Destination.prototype.checkAnswer = function(answer, index) {

    var next = this.info.querySelectorAll(".continue")[0].firstElementChild;

    $(next).click(function(event) {

        event.preventDefault();
        $(next).unbind();

        this.clearDiv(this.boxWrapper);
        this.clearDiv(this.infoPTag);

        this.currentWin.classList.remove("question" + index);

        index += 1;

        this.printInfo(index);

    }.bind(this));

    this.boxWrapper.appendChild(this.info);

    if (answer === questions[index].rightAnswer) {

        this.infoPTag.appendChild(document.createTextNode(questions[index].correct));
        this.boxWrapper.appendChild(this.info);

    }else {

        this.infoPTag.appendChild(document.createTextNode(questions[index].wrong));
        this.boxWrapper.appendChild(this.info);

    }

};

Destination.prototype.saveGame = function(index) {

    localStorage.setItem("savedgame", index);

};

module.exports = Destination;
