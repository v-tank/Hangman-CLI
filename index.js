// Require the necessary files and packages
var Word = require('./word.js');
var inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log;
 
// Array to hold all the words
var wordList = ["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium"]; 

// Define global variables
var randomWord;
var guesses = 0;
var wins = 0;
var guessedLetters = [];
var word;

log("Welcome to the " + chalk.red.bold('Elements') + " Quiz!"); // Prints the welcome message at the start of the game

// Function to generate a random word, set the guesses to 10, and create a new word object at the start of the game
function startGame() {
  guesses = 10;
  randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
  word = new Word(randomWord);
}

// Function to generate a random word and create a new word object per each round
function resetGame() {
  randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
  word = new Word(randomWord);
  word.printToScreen();
}

startGame();  // Call the function to initialize the game
word.printToScreen(); // Call the function to print the blanks to the screen

// Defines the game function
function game() {
  // Checker to keep playing as long as guesses > 0
  if (guesses > 0) {
    inquirer
      .prompt([{
        type: "input",
        name: "guess",
        message: "Guess a letter:"
      }])
      .then(function(res){
        // If user's guess has not been made before, push it to the array of guessed letters
        if (guessedLetters.indexOf(res.guess) === -1) {
          guessedLetters.push(res.guess);

          // If user's guess is not in the word, decrement the guesses remaining.
          if (randomWord.indexOf(res.guess) === -1) {
            guesses--;
          }

          // Pass the user's guess to the object to check whether it exists in the word
          word.guess(res.guess);
          console.log("Guesses remaining: " + chalk.red(guesses) + "\n");
        } else {
          // If user picks the same letter twice, do not decrement the guesses but just alert the user to guess again.
          console.log("You already guessed that letter. Try again!");
        }

        var response = word.printToScreen().trim().toLowerCase(); // Prep the word to compare with the original word
        var trimmedString = response.split(" ");
        
        // Checks whether the user has guessed the entire word
        if ( trimmedString.toString() === randomWord.split("").toString()) {
          wins++; // Increment the wins counter and log to the screen
          log(chalk.green("CORRECT!") + " WINS: " + wins);
          log("Next word!\n");
          
          resetGame();  // Starts the next round by picking a new random word and creating a new word object
          guessedLetters = []; // Empty out the guessed letters array
        }

        game(); // Recursively call the game() function
    }); 
  } else {
    // Else, game is over!
    log(chalk.red("Game over!"));

    // Ask whether the user would like to play again
    inquirer
      .prompt([{
        type: "confirm",
        name: "startAgain",
        message: "Would you like to play again?"
      }])
      .then(function(res) {
        if (res.startAgain) {
          startGame();  // Prep a new game if the user selects 'yes'

          // Re-declare variables 
          guessedLetters = [];
          wins = 0;
          word = new Word(randomWord);
          word.printToScreen();

          game(); // Start playing the game
        }
        else {
          return; // Else return and end the game
        }
      });
  }
}

game(); // Play game!
