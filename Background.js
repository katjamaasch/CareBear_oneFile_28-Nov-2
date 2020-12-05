

class Background {
  constructor(game) {
    this.game = game;
    this.backgroundImages = [];
    const backgroundBack = new Image();
    backgroundBack.src = "images/Day_Sky_back.png";

    const backgroundFirstLayer = new Image();
    backgroundFirstLayer.src = "images/Day_Sky_1st.png";

    const backgroundSecondLayer = new Image();
    backgroundSecondLayer.src = "images/Day_Sky_2nd.png";

    const backgroundThirdLayer = new Image();
    backgroundThirdLayer.src = "images/Day_Sky_3rd.png";

    this.backgroundImages.push(backgroundBack);
    this.backgroundImages.push(backgroundThirdLayer);
    this.backgroundImages.push(backgroundSecondLayer);
    this.backgroundImages.push(backgroundFirstLayer);
    //???
  }

  paint() {
    //console.log("paint is called");
    const contextBackground = this.game.context;
    const canvasBackground = context.canvas;

    const width = canvasBackground.width;
    const height = canvasBackground.height;

    const referencePoint = this.game.newBear.xPosition;
    const referencePointVertical = this.game.newBear.yPosition;
    //this works:
    //context.fillRect(distance, 100, width, height);

    for (let i = 0; i < this.backgroundImages.length; i++) {
     
      let background=this.backgroundImages[i]
       //console.log (background);
      //const layer = backgroundLayers[i];
      //console.log("image " + background.src + " is called");
      //contextBackground.drawImage(background, 0, 0, width, height);
      
      
      const outsetHorizontally = (referencePoint * i/5);
      const outsetVertically = (referencePointVertical * i/20);
      //
      contextBackground.drawImage(background, -outsetHorizontally, -outsetVertically+60, width, height);
      contextBackground.drawImage(background, -outsetHorizontally+width, -outsetVertically+60, width, height);
    }
  }
}