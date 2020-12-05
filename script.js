const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let gameIsRunning = false;

const game = new Game(context);
//console.log("addListenerButtonToStart");
const buttonPlay = document.getElementById('play-game');
buttonPlay.addEventListener('click', () => {
  //console.log("clicked");
  gameIsRunning = true
  game.start();
});


