// Require the 'letter' object
var Letter = require('./letter.js');

// Word constructor function
var Word = function(word) {
  var arrayOfLetters = []; // Array to hold multiple 'Letter' objects for each word
  var string = ""; // An empty string to print the word to the screen

  // Loop to create a new 'Letter' object for each letter in a word
  for (var i = 0 ; i < word.length; i++) {
    var newLetter = new Letter(word[i]); // Create a new object for the specific letter in the word
    arrayOfLetters.push(newLetter); // Push the object to the empty array
  }

  // Function to print blanks and correct guesses to the screen
  this.printToScreen = function() { 
    string = ""; // Empty out the string each time the string is printed
    for (var i=0; i < arrayOfLetters.length; i++) {
      string += arrayOfLetters[i].printLetter() + " "; // Forms the string to print to the screen
    }
    console.log(string); // Logs the string to the screen
    return string;
  }

  // Function to check whether the guessed letter matches an underlying character; if so, reveal it
  this.guess = function(char) {
    for (var i=0; i < arrayOfLetters.length; i++) {
      arrayOfLetters[i].checker(char);
    }
  }
}

// Export the object to be used by other files
module.exports = Word;