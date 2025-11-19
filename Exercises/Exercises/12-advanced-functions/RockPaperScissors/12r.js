let score = JSON.parse(localStorage.getItem('score')) || { // || works exact same as the commented out if statement below.
    wins: 0,
    losses: 0,
    ties: 0
}; //load score already saved from localStorage. Need to turn string back into an object to get via parse.

/*if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
  */

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};
autoplayButtonElement = document.querySelector('.js-autoplay');

autoplayButtonElement.addEventListener('click', autoPlay);

function autoPlay(){
  if(!isAutoPlaying){
    autoplayButtonElement.innerText = 'Stop Playing';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
  }, 1000);
  isAutoPlaying = true; 
  } else {
    clearInterval(intervalId);
    autoplayButtonElement.innerText = 'Auto Play';
    isAutoPlaying = false;
  }
};

resetScoreButton = document.querySelector('.js-reset');
resetScoreButton.addEventListener('click', reset);

function reset(){
  confirmReset();
  resetScoreConfirmButtonYes = document.querySelector('.js-confirm-yes');
  resetScoreConfirmButtonNo = document.querySelector('.js-confirm-no');
  resetScoreConfirmButtonYes.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    removeconfirmReset();
    updateScoreElement();
  });
  resetScoreConfirmButtonNo.addEventListener('click', () => {
    removeconfirmReset();
  });

  /*
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  */
};

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper');
  } else if (event.key === 's'){
    playGame('scissors');
  } else if (event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace'){
    reset();
  }
});

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })


document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })




function playGame(playerMove){
  const computerMove = pickComputerMove()
  let result = '';
  if (playerMove == 'scissors'){
    if (computerMove == 'rock'){
        result = 'You lose.';
      } else if (computerMove === 'paper'){
        result = 'You win.';
      } else if (computerMove === 'scissors'){
        result = 'Tie.';
      }

  } else if(playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You win.';
    } else if (computerMove === 'paper'){
      result = 'Tie.';
    } else if (computerMove === 'scissors'){
      result = 'You lose.';
    }

  } else if(playerMove === 'rock'){
    if (computerMove == 'rock'){
        result = 'Tie.';
    } else if (computerMove === 'paper'){
        result = 'You lose.';
    } else if (computerMove === 'scissors'){
        result = 'You win.';
    }
  }

  if (result == 'You win.'){
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

    localStorage.setItem('score', JSON.stringify(score)); //after score is updated above, it is stored in local storage
    //localStorage only supports strings so we have to convert score data to JSON string. (Now look at let score)

    updateScoreElement();
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-moves').innerHTML = `You <img src="../../../images/${playerMove}-emoji.png" class="move-icon"> <img src="../../../images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
  const randomNumber = Math.random(); //math.random is a method. Math is an object within JS. Random is a function saved inside math object. Built-in objects.
  
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';

  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3){
    computerMove = 'paper';

  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  
  return computerMove;
}

function confirmReset(){
  document.querySelector('.js-confirmation').innerHTML = `Are you sure you want to reset the score? <button class='js-confirm-yes js-confirm-button'>Yes</button><button class='js-confirm-no js-confirm-button'>No</button>`
}

function removeconfirmReset(){
    document.querySelector('.js-confirmation').innerHTML = ''
}