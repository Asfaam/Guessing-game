// Array of words to guess
var words = ['apple', 'banana', 'orange', 'grape', 'mango'];

// Selecting a random word from the array
var randomWord = words[Math.floor(Math.random() * words.length)];

var wordDisplay = document.getElementById('word-display');
var guessInput = document.getElementById('guess-input');
var guessButton = document.getElementById('guess-button');
var resultMessage = document.getElementById('result-message');
var attemptsLeft = document.getElementById('attempts-left');
var newGameButton = document.getElementById('new-game-button');

var attempts = 3;
var guessedLetters = [];

// Initialize the game
function initializeGame() {
  guessedLetters = [];
  attempts = 3;
  resultMessage.textContent = '';
  attemptsLeft.textContent = attempts;
  wordDisplay.textContent = '_'.repeat(randomWord.length);
}

// Check the player's guess
function checkGuess() {
  var guess = guessInput.value.toLowerCase();
  guessInput.value = '';

  if (guess.length !== 1) {
    resultMessage.textContent = 'Please enter a single letter!';
    return;
  }

  if (guessedLetters.includes(guess)) {
    resultMessage.textContent = 'You already guessed that letter!';
    return;
  }

  guessedLetters.push(guess);

  if (randomWord.includes(guess)) {
    // Update the word display with correctly guessed letters
    var displayWord = '';
    for (var i = 0; i < randomWord.length; i++) {
      if (guessedLetters.includes(randomWord[i])) {
        displayWord += randomWord[i];
      } else {
        displayWord += '_';
      }
    }

    wordDisplay.textContent = displayWord;
    if (displayWord === randomWord) {
      resultMessage.textContent = 'Congratulations! You guessed the word correctly.';
      guessButton.disabled = true;
    }
  } else {
      attempts--;
      attemptsLeft.textContent = attempts;
      if (attempts === 0) {
        resultMessage.textContent = 'Game Over! The word was ' + randomWord + '.';
        guessButton.disabled = true;
      } else {
        resultMessage.textContent = 'Incorrect guess. Try again!';
      }
  }
}

// New game button click event
newGameButton.addEventListener('click', function() {
  initializeGame();
  guessButton.disabled = false;
  });

// Guess button click event
guessButton.addEventListener('click', checkGuess);