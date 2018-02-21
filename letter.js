var Letter = function(letter) {
  this.letter = letter;
  this.guessed = false;

  this.printLetter = function() {
    if (this.guessed) {
      return (this.letter.toUpperCase());
    } else {
      return "_";
    }
  }

  this.checker = function(char) {
    if (char === this.letter.toLowerCase()) {
      this.guessed = true;
      this.printLetter();
    } else {
      this.printLetter();
    }
  }
}

module.exports = Letter;
