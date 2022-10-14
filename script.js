'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, won;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    won = false;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// rolling dice func
btnRoll.addEventListener('click', function () {
    // 1. Generating a random dice roll
    if (!won) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. check for rolled 1: if true switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    // 1. add current score to total score
    if (!won) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. check if total >= 100 wins else switch
        if (scores[activePlayer] >= 100) {
            won = true;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = 0;
        } else {
            switchPlayer();
        }
    }
});
btnNew.addEventListener('click', init);
