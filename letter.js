// Letter constructor function
var Letter = function(letter) {
  this.letter = letter; // Stores underlying character value
  this.guessed = false; // Boolean to control whether to reveal value on screen

  // Function to return a letter or a blank if the user has guessed the letter in the word
  this.printLetter = function() {
    if (this.guessed) {
      return (this.letter.toUpperCase());
    } else {
      return "_";
    }
  }

  // Function to check whether the inputted character matches the value of the letter. If so, change the bool value and call the 'printLetter' function
  this.checker = function(char) {
    if (char === this.letter.toLowerCase()) {
      this.guessed = true;
      this.printLetter();
    } else {
      this.printLetter();
    }
  }
}

// Export the object to be used by other files
module.exports = Letter;
