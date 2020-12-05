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