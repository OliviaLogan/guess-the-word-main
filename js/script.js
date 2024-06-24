const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
const letter = letterInput.value;
console.log(letter);
letterInput.value = "";
});