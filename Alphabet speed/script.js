const letters = document.querySelectorAll('.letter');
const timer = document.querySelector('#timer');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let currentLetterIndex = 0;
let startTime;
let timerId;

let attempts = [];

function highlightLetter() {
  const currentLetter = letters[currentLetterIndex];
  currentLetter.classList.add('highlighted');
}

function unhighlightLetter() {
  const currentLetter = letters[currentLetterIndex];
  currentLetter.classList.remove('highlighted');
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  timer.textContent = (elapsedTime / 1000).toFixed(2);
}

function startTimer() {
  startTime = Date.now();
  timerId = setInterval(updateTimer, 10);
}

function stopTimer() {
  clearInterval(timerId);
}

function handleKeydown(event) {
  const keyPressed = event.key.toLowerCase();
  const currentLetter = alphabet[currentLetterIndex];

  if (keyPressed === currentLetter) {
    if (currentLetterIndex === 0) {
      startTimer();
    }

    if (currentLetterIndex < letters.length - 1) {
      unhighlightLetter();
      currentLetterIndex++;
      highlightLetter();
    } else {
      stopTimer();
      letters[currentLetterIndex].classList.add('green');
      document.removeEventListener('keydown', handleKeydown);

      // Calculate time elapsed and congratulate user
      const elapsedTime = Date.now() - startTime;
      const timeInSeconds = (elapsedTime / 1000).toFixed(2);
      attempts.push(timeInSeconds);

      const message = `Congratulations! You completed the alphabet in ${timeInSeconds} seconds.`;
      const congratulation = document.createElement('p');
      congratulation.textContent = message;
      document.querySelector('.container').appendChild(congratulation);

      // Add event listener to restart the game
      document.addEventListener('keydown', handleRestartKeydown);
    }
  } else {
    letters[currentLetterIndex].classList.add('red');
    attempts.push('');
  }
}

function handleRestartKeydown(event) {
  const keyPressed = event.key.toLowerCase();

  if (keyPressed === 'a') {
    startGame();
  }
}

function startGame() {
  // Reset game state
  attempts = [];
  currentLetterIndex = 0;
  timer.textContent = '00:00:000';
  letters.forEach((letter) => {
    letter.classList.remove('green', 'red', 'highlighted');
  });
  const previousCongratulation = document.querySelector('p');
  if (previousCongratulation) {
    previousCongratulation.remove();
  }

  // Add event listener and focus on document to ensure keydown event is triggered
  document.addEventListener('keydown', handleKeydown);
  document.querySelector('body').focus();
}

// Add event listener to the "A" button
document.querySelector('button[data-letter="A"]').addEventListener('click', startGame);

// Add event listener to the document object to listen for keydown events
document.addEventListener('keydown', handleKeydown);