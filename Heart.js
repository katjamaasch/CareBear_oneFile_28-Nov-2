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