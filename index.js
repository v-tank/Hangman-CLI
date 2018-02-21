var Word = require('./word.js');
var inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log;
 

var wordList = ["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium"]; 
var randomWord;
var guesses = 0;
var wins = 0;
var guessedLetters = [];
var word;

log("Welcome to the " + chalk.red.bold('Elements') + " Quiz!");

function startGame() {
  guesses = 10;
  randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
  // console.log(randomWord);
  word = new Word(randomWord);
}

function resetGame() {
  randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
  // console.log(randomWord);
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
          console.log("Guesses remaining: " + chalk.red(guesses) + "\n");
        } else {
          console.log("You already guessed that letter. Try again!");
        }

        var response = word.printToScreen().trim().toLowerCase();
        var trimmedString = response.split(" ");
       
        if ( trimmedString.toString() === randomWord.split("").toString()) {
          wins++;
          log(chalk.green("CORRECT!") + " WINS: " + wins);
          log("Next word!\n");
          
          resetGame();
          guessedLetters = [];

          word = new Word(randomWord);
          word.printToScreen();
        }

        game();
    }); 
  } else {
    log(chalk.red("Game over!"));

    inquirer
      .prompt([{
        type: "confirm",
        name: "startAgain",
        message: "Would you like to play again?"
      }])
      .then(function(res) {
        if (res.startAgain) {
          startGame();

          guessedLetters = [];
          wins = 0;
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
