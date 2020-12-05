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