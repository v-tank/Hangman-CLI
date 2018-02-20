var Letter = function(letter) {
  this.letter = letter;
  this.guessed = false;

  this.printLetter = function() {
    if (this.guessed) {
      // console.log(this.letter);
      return (this.letter.toUpperCase());
    } else {
      // console.log("_");
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
// var letter = new Letter('f');
// letter.checker('i');