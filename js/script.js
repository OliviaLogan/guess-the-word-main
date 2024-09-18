const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
const placeholdLetters = [];
for (const letter of word) {
    placeholdLetters.push("●");
}
wordInProgress.innerText = placeholdLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
e.preventDefault();
guessMessage.innerText = "";
const guess = letterInput.value;
const goodGuess = validateInput(guess);
if (goodGuess) {
    makeGuess(guess);
}
letterInput.value = "";
});


const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Enter a letter";
    } else if (input.length > 1) {
        guessMessage.innerText = "Only enter one letter";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Enter a letter from A to Z";
    } else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = "Oops! You already guessed that letter!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

