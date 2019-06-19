/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as 
he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score 
gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that
 his ROUND score gets added to his GLBAL score. After 
 that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score
 wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, lastDice;
newGame();

// rolls a random number from 1-6 on roll click
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		//checks if dice is 1 and switches to next player
		if (dice === 6 && lastDice === 6) {
			document.querySelector('#score-' + activePlayer).textContent = '0';
			scores[activePlayer] = 0;
			nextPlayer();
		} else if (dice !== 1) {
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}

		lastDice = dice;
	}
});

// defines hold button logic
document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		var winningScore;
		var input = document.querySelector('.final-score').value;

		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		// Checks if player has won the game and stopps the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

// starts a new game
document.querySelector('.btn-new').addEventListener('click', newGame);

// switches to next player
function nextPlayer() {
	if (gamePlaying) {
		activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
		roundScore = 0;
		document.querySelector('#current-0').textContent = 0;
		document.querySelector('#current-1').textContent = 0;
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		document.querySelector('.dice').style.display = 'none';
	}
}

// nulls out all and starts a new game
function newGame() {
	scores = [ 0, 0 ];
	activePlayer = 0;
	gamePlaying = true;
	roundScore = 0;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
