// Swiss Type Design Hangmane Game
// Created by Rob Bethencourt

// Hangman object

var hangman = {
	words: ["frutiger", "helvetica", "futura", "arial", "verdana", "univers", "avenir", "optima", "meta", "akzidenz"],
	word: "",
	spaces: [],
	wins: 0,
	turns: 12,

	// randomly choose a word in the words array
	randomWord: function() {

		this.word = this.words[Math.floor(Math.random()*this.words.length)];
	},

	// create uderscores for letters in word and spaces after each letter
	wordSpaces: function() {

		// loop through the word and push and underscore for each letter
		for (var i = 0; i < this.word.length; i++) {
			this.spaces.push("_");
		}

		// append the appropriate number of spaces to the screen based on the randomly chosen word
		var the_word_p = document.getElementById("word");
		var the_word_node = document.createTextNode(this.spaces.join(" "));
		the_word_p.appendChild(the_word_node);

		console.log(this.spaces);
	},

	updateScreen: function() {

		// update wins on screen
		var wins_p = document.getElementById('wins');
		var wins_node = document.createTextNode(this.wins);
		wins_p.appendChild(wins_node);

		// display turns on screen
		var turns_rem_p = document.getElementById("turns_rem");
		var turn_rem_node = document.createTextNode(this.turns);
		turns_rem_p.appendChild(turn_rem_node);
	}

}

hangman.randomWord();
hangman.wordSpaces();

hangman.updateScreen();

console.log(hangman.word);