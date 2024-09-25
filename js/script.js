const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const wordRequest = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordRequest.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getWord();

const placeholder = function (word) {
    const placeholdLetters = [];
    for (const letter of word) {
        placeholdLetters.push("●");
    }
    wordInProgress.innerText = placeholdLetters.join("");
};

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
        showGuessedLetters();
        numGuessesRemaining(guess);
        updateWordProgress(guessedLetters);
    }
};

const showGuessedLetters = function() {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const updateWordProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedWord.push(letter.toUpperCase());
        } else {
            updatedWord.push("●");
        }
    }
    wordInProgress.innerText = updatedWord.join("");
    checkWin();
};

const numGuessesRemaining = function(guess) {
    word = word.toUpperCase();
    for (const letter of guess) {
        if (!word.includes(letter)) {
            remainingGuesses -= 1;
        } else {
            guessMessage.innerText = `Good job! The word has the letter ${letter}`;
        }
    }
    if (remainingGuesses === 0) {
        guessMessage.innerText = `Sorry, you lose. The word is ${word}`;
        startOver();
    } else if (remainingGuesses === 1) {
        spanRemainingGuesses.innerText = `${remainingGuesses} guess`;
    } else {
        spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    guessMessage.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    guessMessage.innerText = "";
    getWord();
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remaining.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});


