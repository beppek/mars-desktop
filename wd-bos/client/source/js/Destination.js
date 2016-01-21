/**
 *
 * @author: beppek
 * @version: 0.1.0
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

/**
 *
 * This is the constructor function of a quiz game in the spirit of the old backpacker games of my childhood
 * @contsructor
 * @param {object} currentWin - the window to display the game in
 * */
function Destination(currentWin) {

    //Assign to the type for ease of access and change class of window to size up
    this.currentWin = currentWin;
    this.currentWin.classList.add("destinationWindow");

    this.winWorkSpace = currentWin.querySelectorAll(".winWorkSpace")[0];

    //Find templates and start importing
    //Assign to the type for ease of access
    this.template = document.querySelectorAll("#myAppContent")[0].content;

    this.boxWrapper = document.importNode(this.template.firstElementChild, true);
    this.contentTemplate = this.template.querySelectorAll("template")[0].content;

    this.info = document.importNode(this.contentTemplate.firstElementChild, true);
    this.infoPTag = this.info.querySelectorAll("p")[0];

    this.questionDiv = document.importNode(this.contentTemplate.querySelectorAll(".question")[0], true);
    this.answerOptionsDiv = this.questionDiv.querySelectorAll(".answerOptions")[0];
    this.answerOption = this.answerOptionsDiv.querySelectorAll("template")[0].content.firstElementChild;

    //Check if menu already present before adding
    if (!currentWin.querySelectorAll(".winMenu")[0]) {

        //Insert window menu and populate
        var menuTemplate = currentWin.querySelector("#winMenu");
        var menuDiv = document.importNode(menuTemplate.content.firstElementChild, true);

        var menuItem = menuDiv.querySelectorAll(".winMenuItem")[0];

        menuItem.textContent = "Save Game";

        menuItem.addEventListener("click", function(event) {

            event.preventDefault();
            this.saveGame(this.index);

        }.bind(this));

        this.winWorkSpace.parentNode.insertBefore(menuDiv, this.winWorkSpace);

    }

    //Check if save game exists before start up
    if (localStorage.savedgame) {

        this.correctAnswers = parseInt(localStorage.correctanswers);
        this.index = parseInt(localStorage.savedgame);

        if (this.index >= questions.length || isNaN(this.index)) {

            this.index = 0;
            this.correctAnswers = 0;
            localStorage.removeItem("savedgame");
            localStorage.removeItem("correctanswers");

        }

        this.printInfo(this.index);

    }else {

        //this.printInfo(0);
        this.startGame();
        this.correctAnswers = 0;

    }

}

/**
 *
 * This function displays the start information when restarting the game
 * @memberof Destination.prototype
 * */
Destination.prototype.startGame = function() {

    this.currentWin.classList.add("startBG");

    var startTemplate = this.template.querySelectorAll("template")[2].content;
    var startDiv = document.importNode(startTemplate.firstElementChild, true);

    var startGame = startDiv.querySelectorAll("a")[0];

    $(startGame).click(function(event) {

        event.preventDefault();
        this.clearDiv(this.winWorkSpace);
        this.printInfo(0);
        this.currentWin.classList.remove("startBG");

    }.bind(this));

    this.winWorkSpace.appendChild(startDiv);

};

/**
 *
 * This function prints the info from a json object
 * @memberof Destination.prototype
 * @param {int} index - the question to print
 * */
Destination.prototype.printInfo = function(index) {

    //Check if the box-wrapper div is there before adding to the window
    if (!this.winWorkSpace.querySelectorAll(".box-wrapper")[0]) {

        this.winWorkSpace.appendChild(this.boxWrapper);

    }

    //Add class to display the right background image
    this.currentWin.classList.add("question" + index);

    //Populate UI and add event listener
    this.infoPTag.appendChild(document.createTextNode(questions[index].info));

    var next = this.info.querySelectorAll(".continue")[0].firstElementChild;

    $(next).click(function(event) {

        event.preventDefault();

        //remove event listener to avoid doubles
        $(next).unbind();

        //clear content divs
        this.clearDiv(this.boxWrapper);
        this.clearDiv(this.infoPTag);

        this.printQuestion(index);

    }.bind(this));

    this.boxWrapper.appendChild(this.info);

};

/**
 *
 * This function clears the element passed of any content
 * @memberof Destination.prototype
 * @param {object} element - the element to be cleared of content
 * */
Destination.prototype.clearDiv = function(element) {

    //Remove content from element
    while (element.firstChild) {

        element.removeChild(element.firstChild);

    }

};

/**
 *
 * This function prints the question to the UI
 * @memberof Destination.prototype
 * @param {int} index - the question to be displayed
 * */
Destination.prototype.printQuestion = function(index) {

    //Populate UI
    var questionText = this.questionDiv.firstElementChild;
    questionText.textContent = questions[index].question;

    this.boxWrapper.appendChild(this.questionDiv);

    //Loop through the options, add to UI and add event listener
    questions[index].options.forEach(function(option) {

        var optionTag = document.importNode(this.answerOption, true);
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

/**
 *
 * This function checks the answer against the json object
 * @memberof Destination.prototype
 * @param {string} answer - a string containing the answer from the user
 * @param {int} index - the question that was answered
 * */
Destination.prototype.checkAnswer = function(answer, index) {

    //Boolean to store if answer was correct or not
    var correct = false;

    //Add event listener
    var next = this.info.querySelectorAll(".continue")[0].firstElementChild;
    $(next).click(function(event) {

        event.preventDefault();
        $(next).unbind();

        this.clearDiv(this.boxWrapper);
        this.clearDiv(this.infoPTag);

        //Remove class so next image can be displayed
        this.currentWin.classList.remove("question" + index);

        index += 1;
        this.index = index;

        if (correct) {

            this.correctAnswers += 1;

        }

        if (this.index < questions.length) {

            this.printInfo(index);

        }else {

            this.finishedGame();
        }

    }.bind(this));

    //Populate UI
    this.boxWrapper.appendChild(this.info);

    //Check the answers against the json object
    if (answer === questions[index].rightAnswer) {

        correct = true;
        this.infoPTag.appendChild(document.createTextNode(questions[index].correct));
        this.boxWrapper.appendChild(this.info);

    }else {

        this.infoPTag.appendChild(document.createTextNode(questions[index].wrong));
        this.boxWrapper.appendChild(this.info);

    }

};

/**
 *
 * This function displays the result after the game is finished
 * @memberof Destination.prototype
 * */
Destination.prototype.finishedGame = function() {

    //Resizes the window and clears the contents
    this.currentWin.classList.remove("destinationWindow");
    this.clearDiv(this.winWorkSpace);

    //Find template and import
    var template = this.template.querySelectorAll("template")[1].content;
    var resultsDiv = document.importNode(template.firstElementChild, true);

    //Print number of correct answers
    resultsDiv.querySelectorAll("p")[0].appendChild(document.createTextNode(this.correctAnswers + " correct answers!"));

    //Add event listener to restart the game
    var playAgain = resultsDiv.querySelectorAll("a")[0];
    $(playAgain).click(function(event) {

        event.preventDefault();
        $(playAgain).unbind();

        //Clear local storage and reset variables
        localStorage.removeItem("savedgame");
        localStorage.removeItem("correctanswers");
        this.correctAnswers = 0;
        this.index = 0;
        this.clearDiv(this.winWorkSpace);
        new Destination(this.currentWin);

    }.bind(this));

    this.winWorkSpace.appendChild(resultsDiv);

};

/**
 *
 * This function saves the game in the local storage of the browser
 * @memberof Destination.prototype
 * @param {int} index - the question to save the game at
 * */
Destination.prototype.saveGame = function(index) {

    localStorage.removeItem("savedgame");
    localStorage.removeItem("correctanswers");
    localStorage.setItem("savedgame", index);
    localStorage.setItem("correctanswers", this.correctAnswers);

};

module.exports = Destination;
