var Letter = function(letter, index) {
  this.index = index;
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
      console.log("Yup");
    } else {
      console.log("Nope");
      this.printLetter();
    }
  }
}

module.exports = Letter;
// var letter = new Letter('f');
// letter.checker('i');