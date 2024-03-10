import * as PIXI from 'pixi.js';
import Player from '../Player.js'
import { Graphics, Text, TextStyle, Texture } from 'pixi.js'
import GameOverScreen from './GameOverScreen.js'
import Collectable from '../Collectable.js'
import checkCollision from '../utils/checkCollision.js'

export default class GameScreen {
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;
    this.container = null;

    this.player = null;
    this.boostBar = null;
    this.scoreText = null;
    this.spawnCoolDown = 0;
    this.spawnRate = 120;
    this.gameSpeed = 1;
    this.collectables = [];

  }

  onStart(container) {
    return new Promise((resolve) => {
      console.log('onStart:GameScreen');
      this.container = container;
      const planeTexture = Texture.from("../../assets/plane.gif");
      this.player = new Player(planeTexture);

      this.boostBar = new Graphics();
      this.boostBar.beginFill(0x00ff00);
      this.boostBar.drawRect(
        0,
        container._height - 50,
        container._width * (this.coordinator.gameSettings.player.maxBoost / this.coordinator.gameSettings.player.maxBoost),
        20
      );

      this.scoreText = new PIXI.Text(`Score: ${this.coordinator.scoreManager.score}`, {
        fontFamily: "Roboto",
        fontSize: 24,
        fill: 0xFFFFFF,
        align: "left"
      });
      this.scoreText.x = (container._width - this.scoreText.width) - 60 ;
      this.scoreText.y = 20;

      const highScoreText = new Text(
        `High Score: ${this.coordinator.scoreManager.highscore}`,
        new TextStyle({
          fontFamily: "Roboto",
          fontSize: 18,
          fill: "white",
          align: "left"
        })
      );
      highScoreText.x = (container._width - highScoreText.width) - 20;
      highScoreText.y = 60;



      const clickableArea = new PIXI.Sprite(PIXI.Texture.WHITE);
      clickableArea.width = container._width;
      clickableArea.height = container._height;
      clickableArea.eventMode = 'static';
      clickableArea.alpha = 0;
      clickableArea.on('pointerdown', () => this.player.jump());

      /**
       * Add all stage elements
       */
      container.addChild(this.scoreText);
      container.addChild(highScoreText);
      container.addChild(clickableArea);
      container.addChild(this.boostBar);
      container.addChild(this.player);
      this.player.spawn(30);

      resolve();
    })
  }

  onUpdate(delta) {
    this.player.update();
    this.coordinator.scoreManager.addToScore(delta / 10)
    this.scoreText.text = `Score: ${this.coordinator.scoreManager.score}`;

    this.boostBar.clear();
    this.boostBar.beginFill(0x00ff00);
    this.boostBar.drawRect(
      0,
     this.container._height - 50,
     this.container._width * (this.player.getBoost() / this.coordinator.gameSettings.player.maxBoost),
      20
    );
    this.boostBar.endFill();

    this.spawnCoolDown -= delta;
    if (this.spawnCoolDown <= 0) {
      this.spawnCoolDown = this.spawnRate;
      this.collectables.push(new Collectable(this.container, this.addCollectable.bind(this), this.removeCollectable.bind(this)));
    }

    this.collectables.forEach((collectable) => {
      collectable.update();

      if (checkCollision(this.player, collectable.sprite)) {
        this.coordinator.scoreManager.addToScore(10);
        this.player.addBoost(10);
        collectable.destroy();
      }
    });



    // Game Over scenario
    if (this.player.y > this.container._height) {
      this.coordinator.gotoScene(new GameOverScreen(this.coordinator));
    }

  }

  onFinish(delta) {

  }

  addCollectable(collectable) {
    this.collectables.push(collectable);
  }

  removeCollectable(collectable) {
    this.collectables = this.collectables.filter((object) => object !== collectable);
  }
}
