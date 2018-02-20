var Word = require('./word.js');
var inquirer = require('inquirer');

var wordList = ["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium"]; 
var randomWord;
var guesses = 0;
var guessedLetters = [];
var word;

function startGame() {
  guesses = 3;
  // console.log("Guesses reset to " + guesses);
  randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
  console.log(randomWord);
  word = new Word(randomWord);
}

startGame();

word.printToScreen();

function game() {
  if (guesses > 0) {
    inquirer
      .prompt([{
        type: "input",
        name: "guess",
        message: "Guess a letter:"
      }])
      .then(function(res){
        if (guessedLetters.indexOf(res.guess) === -1) {
          guessedLetters.push(res.guess);

          if (randomWord.indexOf(res.guess) === -1) {
            guesses--;
            // console.log("Guesses subtracted.");
          }

          word.guess(res.guess);
          console.log("Guesses remaining: " + guesses);
        } else {
          console.log("You already guessed that letter. Try again!");
        }

        // console.log(randomWord.split(""));

        // word.printToScreen();
        var response = word.printToScreen().trim().toLowerCase();
        var trimmedString = response.split(" ");
        // console.log(trimmedString);
        // console.log(randomWord.split(""));
        if ( trimmedString.toString() === randomWord.split("").toString()) {
          console.log("You won!");
          
          startGame();
          guessedLetters = [];

          word = new Word(randomWord);
          word.printToScreen();
        }
        // word.printToScreen().trim();
        game();
    }); 
  } else {
    console.log("Game over!");

    inquirer
      .prompt([{
        type: "confirm",
        name: "startAgain",
        message: "Would you like to play again?"
      }])
      .then(function(res) {
        var word = require('./word.js');

        if (res.startAgain) {
          startGame();

          guessedLetters = [];

          word = new Word(randomWord);
          word.printToScreen();

          game();
        }
        else {
          return;
        }
      });
  }
}

game();
