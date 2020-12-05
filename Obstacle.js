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