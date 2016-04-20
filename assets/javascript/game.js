// Swiss Type Design Hangmane Game
// Created by Rob Bethencourt

// Hangman object

var hangman = {
	words: ["frutiger", "helvetica", "futura", "arial", "verdana", "univers", "avenir", "optima", "meta", "akzidenz"],
	word: "",
	spaces: [],
	wins: 0,
	turns: 12,
	gomessage: ["Congratulation! You Got It!", "Boo!"],
	wordmessage: ["frutiger message", "helvetica message", "futura message", "arial message", "verdana message", "univers message", "avenir message", "optima message", "meta message", "akzidenz message"],

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
		the_word_p.innerHTML = this.spaces.join(" ");
	},

	updateWins: function() {

		// update wins on screen
		var wins_p = document.getElementById('wins');
		wins_p.innerHTML = this.wins;
	},

	updateTurns: function() {

		// display turns on screen
		var turns_rem_p = document.getElementById("turns_rem");
		turns_rem_p.innerHTML = this.turns;
	},

	lettersUsed: function (letter_to_pass) {
		
		var letters_used = document.getElementById("letters_used");
		var letters_used_node = document.createTextNode(letter_to_pass);
		letters_used.appendChild(letters_used_node);
	},

	gameMechanics: function (letter_to_check) {

		var word_length = this.word.length;
		var counter = 0;

		var red_col = document.getElementsByClassName("red-col");

		var overlay_div = document.getElementById("overlay");
		var overlay_word = document.getElementById("overlay-word");
		var game_over_message = document.getElementById("game-over-message");
		var overlay_fact = document.getElementById("overlay-fact");

		function updateGame() {
			overlay_word.innerHTML = hangman.word;
			overlay_fact.innerHTML = hangman.wordmessage[hangman.words.indexOf(hangman.word)];
			hangman.spaces = [];
			hangman.word = "";
			hangman.turns = 12;
			var letters_used = document.getElementById("letters_used");
			letters_used.innerHTML = "";
			hangman.randomWord();
			hangman.wordSpaces();
			hangman.updateTurns();
			for (var i = 0; i < 12; i++) {
				red_col[i].style.opacity = 0;
			}
		}

		// loop through the random word and check if the entered letter matches any in the randomly selected word
		for (var i = 0; i < word_length; i++) {

			// if it matches...
			if (this.word[i] === letter_to_check) {

				// ...swap out that space for the one entered
				this.spaces[i] = letter_to_check;

				// ...update what's displayed on the screen
				var the_word_p = document.getElementById("word");
				the_word_p.innerHTML = this.spaces.join(" ");

			// if it doesn't match, update the counter
			} else {
				counter++;
			}
		}

		// compare the counter to the length of the randomly selected word. If it's the same length, (meaning the entered letter didn't match any of the letters of the randomly selected word)
		if (counter === word_length) {
			// decrease the turn by one, updated the scree and reset the counter to 0
			hangman.turns--;

			// need to reset the column opacity if the game ends, so need this check once hangman.turns is set to 0 and before hangman.updateTurns() gets called
			if (hangman.turns > 0) {
				// need to multiply the colums remaining minus original amount of columns so that the opacity increases correctly
				var red_col_multiply = 12 - hangman.turns;
				red_col[hangman.turns - 1].style.opacity = .09 * red_col_multiply;
			}

			hangman.updateTurns();
			counter = 0;

			

			// if the counter has reached 0 (we need to reset the game)
			if (hangman.turns < 1) {
				updateGame();
				// display the overlay
				overlay_div.style.background = "#ff0000";
				game_over_message.innerHTML = hangman.gomessage[1];
				overlay_div.style.opacity = 1;
			}
		}

		if (this.spaces.join("") === this.word) {
			this.wins++;
			hangman.updateWins();
			updateGame();
			// display the overlay
			overlay_div.style.background = "#1A1B1C";
			game_over_message.innerHTML = hangman.gomessage[0];
			overlay_div.style.opacity = 1;
		}
	}

}

// Captures Key Clicks
document.onkeyup = function(event) {

	// Determines which exact key was selected. Make it lowercase
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// lettersUsed needs to go before gameMechanics or the last letter selected will appear in the new game
	hangman.lettersUsed(userGuess);
	hangman.gameMechanics(userGuess);
	
}

//functions to begin the game
hangman.randomWord();
hangman.wordSpaces();
hangman.updateWins();
hangman.updateTurns();

// this closes the overlay after the game is over
var close_overlay = document.getElementById("close-overlay");

close_overlay.onclick = function() {
	var overlay_div = document.getElementById("overlay");
	overlay_div.style.opacity = 0;
}