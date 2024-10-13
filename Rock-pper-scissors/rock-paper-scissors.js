let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};   

// Function to update the score display
function updateScoreDisplay() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


///EVENT LISTERNERS

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
} );

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
} );

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
} );

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
} );


document.querySelector('.js-reset-score-button').addEventListener('click' , () => {
    resetScore();
});

document.body.addEventListener('keydown', (event) => {
   if (event.key === 'r' || event.key === 'R') {
    playGame('rock');
   } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
   } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
   }
});


//PLAYER MOVE
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'You lose';
        } else {
            result = 'You win';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else {
            result = 'You lose';
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose';
        } else if (computerMove === 'paper') {
            result = 'You win';
        } else {
            result = 'Tie';
        }
    }

    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    
    updateScoreDisplay(); 
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}.png" alt="" class="move-icon"> Computer - <img src="${computerMove}.png" alt="" class="move-icon"> `;

}

//COMPUTER MOVE
function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        return 'rock';
    } else if (randomNumber < 2 / 3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}


//reset score
function resetScore() {
     // Ask for confirmation from the user
     const userConfirmed = confirm('Do you really want to reset the score?');

     // If the user clicks "Cancel" (i.e., they don't want to reset)
     if (!userConfirmed) {
         alert('Score was not reset.');
         return;  // Exit the function without resetting the score
     }
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    alert('Score has been reset.');
    document.querySelector('.js-moves').innerHTML = '';
    updateScoreDisplay();  // Update score display after resetting
}
updateScoreDisplay();

///AUTOPLAY
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    const button = document.querySelector('.auto-play-button');

    if (!isAutoPlaying) {
   intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
    }, 10);
    isAutoPlaying = true;
    button.style.backgroundColor = 'green';
    button.innerHTML = 'Auto Playing';
} else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    button.style.backgroundColor = '';
    button.innerHTML = 'Auto Play';
} 
}
