// Swiss Type Design Hangmane Game
// Created by Rob Bethencourt

// Hangman object
var hangman = {
	words: ["frutiger", "helvetica", "futura", "arial", "verdana", "univers", "avenir", "optima", "meta", "akzidenz"],
	word: "",
	wordsguessed: [],
	lettersused: [],
	spaces: [],
	wins: 0,
	turns: 12,
	gomessage: ["You Got It", "Boo"],
	wordmessage: ["Frutiger is a series of typefaces named after its Swiss designer, Adrian Frutiger. Frutiger is a humanist sans-serif typeface, intended to be clear and highly legible at a distance or at small text sizes.", "Helvetica is a widely used sans-serif typeface developed in 1957 by Swiss typeface designer Max Miedinger with input from Eduard Hoffmann.", "Futura is a geometric sans-serif typeface designed in 1927 by Paul Renner. It was designed as a contribution on the New Frankfurt-project.", "Arial, sometimes marketed or displayed in software as Arial MT, is a sans-serif typeface and set of computer fonts.", "Verdana is a humanist sans-serif typeface designed by Matthew Carter for Microsoft Corporation, with hand-hinting done by Thomas Rickner, then at Monotype.", "Univers is the name of a sans-serif typeface designed by Adrian Frutiger in 1954. Classified as a neo-grotesque typeface, one based on the model of the 1898 typeface Akzidenz-Grotesk.", "Avenir is a geometric sans-serif typeface designed by Adrian Frutiger in 1988 and released by Linotype GmbH, now a subsidiary of Monotype Corporation. The word avenir is French for 'future'.", "Optima is a humanist sans-serif typeface designed by Hermann Zapf and released between 1952 and 1955 for the D. Stempel AG foundry, Frankfurt, Germany.", "FF Meta is a humanist sans-serif typeface family designed by Erik Spiekermann and released in 1991[1] through his FontFont library. According to Spiekermann, FF Meta was intended to be a 'complete antithesis of Helvetica,' which he found 'boring and bland.'", "Akzidenz-Grotesk is a grotesque typeface originally released by the Berthold Type Foundry in 1896 under the name Accidenz-Grotesk."],
	sounds: ["assets/sounds/win.mp3", "assets/sounds/lose.mp3"],

	// randomly choose a word in the words array
	randomWord: function() {

		this.word = this.words[Math.floor(Math.random()*this.words.length)];
	}, // end randomWord

	// create uderscores for letters in word and spaces after each letter
	wordSpaces: function() {

		// loop through the word and push and underscore for each letter
		for (var i = 0; i < this.word.length; i++) {

			this.spaces.push("_");
		} // end for loop

		// append the appropriate number of spaces to the screen based on the randomly chosen word
		var the_word_p = document.getElementById("word");
		var the_word_node = document.createTextNode(this.spaces.join(" "));
		the_word_p.innerHTML = this.spaces.join(" ");
	}, // end wordSpaces

	updateWins: function() {

		// update wins on screen
		var wins_p = document.getElementById('wins');
		wins_p.innerHTML = this.wins;
	}, // end updateWins

	updateTurns: function() {

		// display turns on screen
		var turns_rem_p = document.getElementById("turns_rem");
		turns_rem_p.innerHTML = this.turns;
	}, // end updateTurns

	lettersUsed: function (letter_to_pass) {
		
		var letters_used = document.getElementById("letters_used");

		// push the letter entered into the lettersused array
		this.lettersused.push(letter_to_pass);

		// display the lettersused array on the screen
		letters_used.innerHTML = this.lettersused.join("");
	}, // end lettersUsed

	wordsGuessedArray: function () {

		var wordsguessedcounter = 0;

		for (var i = 0; i < this.wordsguessed.length; i++) {

			if (this.word === this.wordsguessed[i]) {

				wordsguessedcounter++;
			} // end if
		} // end for loop

		if (wordsguessedcounter === 0) {

			this.wordsguessed.push(this.word)
		} // end if
	},

	updateGame: function () {

		var overlay_word = document.getElementById("overlay-word");
		var overlay_fact = document.getElementById("overlay-fact");

		var letters_used = document.getElementById("letters_used");

		var red_col = document.getElementsByClassName("red-col");
		
		overlay_word.innerHTML = this.word;
		overlay_fact.innerHTML = this.wordmessage[this.words.indexOf(this.word)];
		this.spaces = [];
		this.word = "";
		this.lettersused = [];
		this.turns = 12;
		letters_used.innerHTML = "";
		this.randomWord();
		this.wordSpaces();
		this.updateTurns();

		// loop through the columns and set their opacity to 0
		for (var i = 0; i < 12; i++) {

			red_col[i].style.opacity = 0;
		} // end for loop
	}, // end updateGame

	gameMechanics: function (letter_to_check) {

		var lettersused_counter = 0;
		var counter = 0;

		var word_length = this.word.length;
		var letterused_length = this.lettersused.length;

		var red_col = document.getElementsByClassName("red-col");

		var letterforms = document.getElementsByTagName("h5");

		var overlay_div = document.getElementById("overlay");
		var game_over_message = document.getElementById("game-over-message");
		var secret_message = document.getElementById("secret-message");

		var letterforms_bg = document.getElementById("letterforms-bg");

		// loop through the letteres used to check if letter entered has been used (the - 1 is so that we don't check the letter that was just entered against itself)
		for (var i = 0; i < letterused_length - 1; i++) {
					
			if (this.lettersused[i] === letter_to_check) {

				// if the letter entered has been used, then update the counter
				lettersused_counter++;
			} // end if
		} // end for loop

		// if the lettersused_counter is not greater than 0, that means the letter entered has not been used and can be compared to the word
		if (lettersused_counter === 0) {

			lettersused_counter = 0;

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
				} // end if
			} // end for loop
		} // end if


		// compare the counter to the length of the randomly selected word. If it's the same length, (meaning the entered letter didn't match any of the letters of the randomly selected word)
		if (counter === word_length) {

			// decrease the turn by one, updated the scree and reset the counter to 0
			this.turns--;

			// need to reset the column opacity if the game ends, so need this check once this.turns is set to 0 and before this.updateTurns() gets called
			if (this.turns > 0) {

				// need to multiply the colums remaining minus original amount of columns so that the opacity increases correctly
				var red_col_multiply = 12 - this.turns;
				red_col[this.turns - 1].style.opacity = .09 * red_col_multiply;

				for (var i = 0; i < letterforms.length; i++) {
					letterforms[i].style.opacity = .05 * red_col_multiply;
				}
			} // end if

			this.updateTurns();
			counter = 0;

			

			// if the counter has reached 0 (we need to reset the game)
			if (this.turns < 1) {

				this.updateGame();

				// updates the opacity to 0 for all background letteroforms
				for (var i = 0; i < letterforms.length; i++) {
					letterforms[i].style.opacity = 0;
				} // end for loop

				// display the overlay
				overlay_div.style.background = "#ff0000";
				game_over_message.innerHTML = this.gomessage[1];
				overlay_div.style.opacity = .9;
				var lose_sound = new Audio(this.sounds[1]);
				lose_sound.play();
			} // end if
		} // end if

		// if the word has been uncovered the player wins, the congratulations screen shows and the game resets
		if (this.spaces.join("") === this.word) {

			// pushing the guessed words into an array to track when all the available words have been guessed
			this.wordsGuessedArray();

			var wordsguessedlength = this.wordsguessed.length;
			var wordslength = this.words.length;
			// if half the words have been guessed
			if (wordsguessedlength >= wordslength / 2 && wordsguessedlength < wordslength) {

					// add the secret message
					secret_message.innerHTML = "You've guessed " + wordsguessedlength + " of the available words! Guess the other " + (wordslength - wordsguessedlength) + " to unlock the secret <span class='sm-1'>b</span><span class='sm-2'>a</span><span class='sm-3'>c</span><span class='sm-4'>k</span><span class='sm-5'>g</span><span class='sm-6'>r</span><span class='sm-7'>o</span><span class='sm-8'>u</span><span class='sm-9'>n</span><span class='sm-10'>d</span>.";
			} // end if

			// if all the words have been guessed
			if (wordsguessedlength === wordslength) {

					// add the secret message
					secret_message.innerHTML = "You've guessed all the available words! You've unlocked the secret <span class='sm-1'>b</span><span class='sm-2'>a</span><span class='sm-3'>c</span><span class='sm-4'>k</span><span class='sm-5'>g</span><span class='sm-6'>r</span><span class='sm-7'>o</span><span class='sm-8'>u</span><span class='sm-9'>n</span><span class='sm-10'>d</span>.";

					// add the h5 elements to the #letterforms-bg div. This is the secret background!!!!!
					for (var i = 0; i < this.words.length; i++) {

						var h5_el = document.createElement("h5");
						var h5_text_node = document.createTextNode(this.word[i]);

						h5_el.appendChild(h5_text_node);
						letterforms_bg.appendChild(h5_el);
					} // end for loop
			} // end if

			this.wins++;
			this.updateWins();
			this.updateGame();

			// updates the opacity to 0 for all background letteroforms
			for (var i = 0; i < letterforms.length; i++) {
					letterforms[i].style.opacity = 0;
				} // end for loop

			// display the overlay
			overlay_div.style.background = "#1A1B1C";
			game_over_message.innerHTML = this.gomessage[0];
			overlay_div.style.opacity = .9;
			var win_sound = new Audio(this.sounds[0]);
			win_sound.play();
		} // end if
	} // end gameMechanics
}

// Captures Key Clicks
document.onkeyup = function(event) {

	// Determines which exact key was selected. Make it lowercase
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

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