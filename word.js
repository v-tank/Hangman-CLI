var Letter = require('./letter.js');

var Word = function(word) {
  var arrayOfLetters = [];
  var string = "";

  for (var i = 0 ; i < word.length; i++) {
    var newLetter = new Letter(word[i]);
    arrayOfLetters.push(newLetter);
  }

  // console.log(arrayOfLetters);

  this.printToScreen = function() { 
    string = "";
    for (var i=0; i < arrayOfLetters.length; i++) {
      string += arrayOfLetters[i].printLetter() + " ";
    }
    console.log(string);
    console.log("\n");
    return string;
  }

  this.guess = function(char) {
    for (var i=0; i < arrayOfLetters.length; i++) {
      arrayOfLetters[i].checker(char);
    }
  }
}

// var word = new Word("Chicken");
// word.printToScreen();

module.exports = Word;