var Letter = function(letter) {
  this.letter = letter;
  this.guessedCorrectly = false;
  
  this.toString = function() {
    if (guessedCorrectly) {
      return this.letter;
    } else {
      return '_';
    }
  }

  this.letterChecker = function(char) {
    if (char === this.letter) {
      this.guessedCorrectly = true;
      console.log("You guessed correctly!");
    } else {
      console.log("Wrong!");
    }
  }
}

// word = "florine"
var newLetter = new Letter("f");
console.log(newLetter.letter);
// console.log(newLetter.letterChecker('i'));
newLetter.letterChecker('f');

module.exports = Letter;