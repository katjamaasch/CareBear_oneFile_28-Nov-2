const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let gameIsRunning = false;



////////////////////////////////////////////////////////////
class Bear {
  constructor() {
    this.xPosition = 50;
    this.yPosition = 50;
    this.width = 50;
    this.height = 70;
    this.score = 0;
    this.sadnessfactor = 0;
    this.speed = 0.3;
    this.bearImage = new Image();
    this.bearImage.src = "images/Grumpy_bear.png";
    this.keyBindings();
  }

  //if i am erasing the keybindings function the bear is not getting rendered..??? why?
  keyBindings() {
    document.addEventListener('keydown', (event) => {
      //console.log("What is the keycode?" + event.keyCode +"isrunning:" + gameIsRunning);
      if (gameIsRunning) {
        switch (event.keyCode) {
          case 38:
            this.moveUp();
            this.drawBear();
            break;
          case 40:
            this.moveDown();
            this.drawBear();
            break;
          case 37:
            this.moveLeft();
            this.drawBear();
            break;
          case 39:
            this.moveRight();
            this.drawBear();
            break;
        }
      }
    });
  }

  runLogic() {
    this.draggingDown();
  }
  //executes the method by which y gets incremented

  drawBear() {
    context.drawImage(
      this.bearImage,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }

  moveUp() {
    if (this.yPosition > 15) {
      this.yPosition = this.yPosition - 15;
    }
  };
  moveDown() {
    this.yPosition = this.yPosition + 15;
  }

  moveLeft() {
    if (this.xPosition > 15) {
      this.xPosition = this.xPosition - 15;
    }
  };
  moveRight() {
    if (this.xPosition < canvas.width - 15) {
      this.xPosition = this.xPosition + 15;
    }
  };

  draggingDown() {
    this.yPosition += this.speed;
    /*
    if (this.score === 0) {
      this.yPosition += 0.1;
    }
    else if (this.score === -10) {
      this.yPosition += 0.2;
    }
    else if (this.score === -20) {
      this.yPosition += 0.6;
    }
    else if (this.score === -30) {
      this.yPosition += 1.1;
      */
  }


  isColliding(obstacle) {
    //collision with bear heart
    let bearhitline = (this.xPosition + this.width)
    return (
      bearhitline >= obstacle.x &&
      (this.yPosition < obstacle.y + obstacle.height) && (this.yPosition + this.height > obstacle.y)
    )
  }
}


///////////////////////////////////////////////////////////////

class Obstacle {
  constructor(speed) {
    this.x = canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = speed;
  }

  runLogic() {
    this.x -= this.speed;
  }
  isOutofBounds() {
    return this.x + this.width < 0
  }
}


class Heart extends Obstacle {
  constructor(speed) {
    super(speed);
    this.heartImage = new Image();
    this.heartImage.src = "images/customHeart.png";
    this.width = 30
    this.height = 30
  }

  draw() {
    //console.log(this.x + "this is y:" + this.y);
    context.drawImage(
      this.heartImage,
      this.x,
      this.y,
      this.width,
      this.height,
    );

  }
}
/////////////////////////////////////////////////////////////

class Cloud extends Obstacle {
  constructor(speed) {
    super(speed);
    this.cloudImage = new Image();
    this.cloudImage.src = "images/cloud3.png";
    this.width = 70;
    this.height = 70;
  }

  draw() {
    //console.log(this.x + "this is y:" + this.y);
    context.drawImage(
      this.cloudImage,
      this.x,
      this.y,
      this.width,
      this.height,
    );

  }
}


//////////////////////////GAME//////////////////////////////////
class Game {
  constructor(context) {
    this.newBear = new Bear();
    //this.clouds = [];
    //this.hearts = [];
    this.obstacles = [];

    this.background = new Background(this);
    this.context = context;
    this.cheerbearImage = new Image();
    this.cheerbearImage.src = "images/cheerbear.png";
    this.sadbearImage = new Image();
    this.sadbearImage.src = "images/Sad_bear.png";
    //this.boltImage = new Image("images/bolt.png");

  }

  reset() {
    gameIsRunning = false;
    this.newBear.score = 0;
    this.newBear.sadnessfactor = 0;
    this.newBear.xPosition = 50;
    this.newBear.yPosition = 50;
    this.newBear.speed = 0.3;
    this.resetDraw()
    //const game = new Game(context);
    console.log("new game has been instanciated");
  }

  drawWinningBear() {
    context.drawImage(
      this.cheerbearImage,
      200,
      80,
      200,
      200
    );
  }

  drawLosingBear() {
    context.drawImage(
      this.sadbearImage,
      200,
      80,
      200,
      200
    );
  }

  drawScore() {
    context.fillStyle = '#3D93BB';
    context.font = '42px "Amatic SC"';
    context.fillText("Score 100 points to get to Cloud #7", 150, 330);
    context.font = '24px "Amatic SC"';
    context.fillStyle = "grey";
    context.fillText("Beware of the clouds! They make you sad and tear you down.", 150, 30);
    context.fillStyle = '#3D93BB';
    context.font = '42px "Amatic SC"';
    context.fillText("Score:", 150, 380);
    context.fillText(this.newBear.score, 230, 380);
    context.fillText("Sadness:", 280, 380);
    context.fillText(this.newBear.sadnessfactor, 385, 380);
  }



  playAudioHeart() {
    let audioHeart = new Audio("./sounds/Score_2.mp3");
    audioHeart.play();
  }

  playAudioCloud() {
    let audioCloud = new Audio("./sounds/Alien_Steps_1.mp3");
    audioCloud.play();
  }

  playAudioGameover(){
    let audioGameover = new Audio ("./sounds/Game_Over_Music.mp3");
    audioGameover.play();
  }

  playAudioWin(){
    let audioWin= new Audio ("./sounds/You_won.mp3");
    audioWin.play();
  }



  start() {
    //console.log("start() is executed");
    document.addEventListener('keydown', (event) => {
      //console.log("What is the keycode?" + event.keyCode);
      switch (event.keyCode) {
        case 81:
          //console.log("setting to false")
          
          this.reset()
          break;
      }
    });
    this.loop();
  }


  loop() {
    if (gameIsRunning) {
      //console.log("loop() is executed");
      let gameislost = this.newBear.yPosition > canvas.height
      if (gameislost) {
        //alert("Game over");
        //console.log("call reset")
        this.playAudioGameover();
        this.reset();
        context.fillRect(0, 0, 600, 400);
        context.font = '42px "Amatic SC"';
        context.fillStyle = 'white';
        context.fillText("Try again and cheer up!", 170, 330);
        this.drawLosingBear();
        return;
        //this.start();

      } else if (this.newBear.score === 100) {
        //alert("You won!");
        this.playAudioWin();
        this.reset();
        context.fillStyle = '#C461D2';
        context.fillRect(0, 0, 600, 400);
        context.font = '42px "Amatic SC"';
        this.drawWinningBear();
        context.fillStyle = 'white';
        context.fillText("You've made it to Cloud #7", 150, 330);
        return;
        this.start();
      }

      if (Math.random() < 0.02) {
        //the whole thing runs only for 3% of the loops
        if (Math.random() < 0.2) {
          //only 20% of the time there is a heart
          this.obstacles.push(new Heart(Math.ceil(Math.random() * 6) + 2));
          //console.log("There is a new heart");
          //initialises new object with random speed that is pushed into obstacles array
        } else {
          this.obstacles.push(new Cloud(9));
          //console.log("There is a new cloud");
          //always high speed
        }
      }
      //eliminating obstacles that are out of the screen from the list
      for (let value of this.obstacles) {
        //console.log(this.obstacles.length + " " + value.isOutofBounds())
        if (value.isOutofBounds()) {
          const obstindex = this.obstacles.indexOf(value)
          //console.log('delete index %d', obstindex);
          this.obstacles.splice(obstindex, 1)
        }
      };

      for (let o of this.obstacles) {
        if (this.newBear.isColliding(o)) {
          const obstindex = this.obstacles.indexOf(o);
          //when there is a collision, I want the score to change + 
          //eliminating every object that is intersecting with the bear
          if (o instanceof Heart) {
            //console.log(o instanceof Hearts);
            this.playAudioHeart();
            this.newBear.score += 10;
            if (this.newBear.speed > 0.3) {
              this.newBear.speed -= 0.2;
              if (this.newBear.sadnessfactor > 0) {
                this.newBear.sadnessfactor -= 1;
              }
            }
            this.obstacles.splice(obstindex, 1);
            //console.log(this.newBear.score);

          } else if (o instanceof Cloud) {
            //console.log("Is this a cloud?" + o instanceof Clouds);
            this.playAudioCloud();
            //context.drawImage(this.boltImage, 50, 50, 100, 100);
            this.newBear.score -= 10;
            this.newBear.speed += 0.3;
            this.newBear.sadnessfactor += 1;
            this.obstacles.splice(obstindex, 1);
            //console.log(this.newBear.score);
          }
        }
      }

      this.draw();
      //executes the method by which the canvas gets cleared and then the player drawn


      setTimeout(() => {
        if (gameIsRunning) {
          this.loop();
        }
      }, 1000 / 30);

      //the mehod this.loop gets called again after every 1000/30
    }
  }


  draw() {
    this.resetDraw();
    //this.background.paint();
    this.newBear.runLogic();
    for (let o of this.obstacles) {
      //iterating through every object in the list obstacles
      o.runLogic()
      //calling the runLogic for every object
      o.draw()
      //drawing every object in the list

    }



  }

  resetDraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Call draw method for every "element" in game
    this.background.paint();
    this.drawScore();
    this.newBear.drawBear();
  }

}


/////////////////////////////////////////////////////

/* 

setTimeout erwartet eine Funktion. Die kann auf verschiedene Weisen übergeben werden:

function initBear() {
  newBear.drawBear()
};
//setTimeout(initBear, 500);

const initialiseBear = initBear;
//setTimeout(initialiseBear, 500);


//setTimeout(() => { newBear.drawBear() }, 500);
// >> () => { } denotes a function
//drawBear is a method, not a function, it needs to be encapsulated like this 

*/
/////////////////////////////////////////////////////

const game = new Game(context);
//console.log("addListenerButtonToStart");
const $buttonPlay = document.getElementById('play-game');
$buttonPlay.addEventListener('click', () => {
  //console.log("clicked");
  gameIsRunning = true
  game.start();
});


