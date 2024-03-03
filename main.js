/**
 * @TODO:
 * - Refactor containers into individual menu, game, gameover
 * - Create UIManager to handle all UI elements
 * - Create GameManager to handle all game logic
 */
import {
  Application,
  Sprite,
  TextStyle,
  Texture,
  Text,
  Graphics,
} from "pixi.js";
import ScoreManager from "./src/ScoreManager";
import StageManager from "./src/StageManager";
import Player from "./src/Player";
import GameSettings from "./src/GameSettings";

const app = new StageManager({
  mountPoint: document.getElementById("game-canvas"),
  width: window.innerWidth,
  height: window.innerHeight,
});
const scoreManager = new ScoreManager();

const planeTexture = Texture.from("assets/plane.gif");
const player = new Player(planeTexture);

const { maxBoost } = GameSettings.player;

app.addToStage(player);
player.spawn(app.renderer.height / 2);

let spawnCooldown = 0;
let spawnRate = 120;
let gameSpeed = 1;
let objects = [];

let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
});

let scoreText = new Text(`Score: ${scoreManager.score}`, style);
scoreText.x = app.renderer.width - 200;
scoreText.y = 20;
let highScoreText = new Text(
  `High Score: ${scoreManager.highscore}`,
  new TextStyle({
    fontFamily: "Arial",
    fontSize: 24,
    fill: "white",
  })
);
highScoreText.x = app.renderer.width - 200;
highScoreText.y = 60;

let boostBar = new Graphics();
boostBar.beginFill(0x00ff00);
boostBar.drawRect(
  0,
  app.renderer.height - 50,
  app.renderer.width * (player.getBoost() / maxBoost),
  20
);
app.addToStage(boostBar);
app.addToStage(scoreText);
app.addToStage(highScoreText);

app.renderer.view.addEventListener("pointerdown", player.jump.bind(player));

const spawnObject = () => {
  const object = new Sprite(Texture.WHITE);
  object.width = 20;
  object.height = 20;

  object.x = app.renderer.width;
  object.y = Math.random() * app.renderer.height - 50; //  need to clamp this.
  object.vx = gameSpeed * -1;
  app.addToStage(object);

  objects.push(object);
};

// Collision detection function
function collision(sprite1, sprite2) {
  let hit = false;
  if (
    sprite1.x < sprite2.x + sprite2.width &&
    sprite1.x + sprite1.width > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height &&
    sprite1.height + sprite1.y > sprite2.y
  ) {
    hit = true;
  }
  return hit;
}

const gameLoop = (delta) => {
  player.update();

  spawnCooldown -= delta;
  if (spawnCooldown <= 0) {
    spawnObject();
    spawnCooldown = spawnRate;
  }

  for (let object of objects) {
    object.x += object.vx;
    if (object.x < -20) {
      app.removeFromStage(object);
    }

    if (collision(player, object)) {
      app.removeFromStage(object);
      scoreManager.addToScore(10);
      player.addBoost(10);
      // delete the object from the array
      objects = objects.filter((item) => item !== object);
    }
  }

  // boost logic

  boostBar.clear();
  boostBar.beginFill(0x00ff00);
  boostBar.drawRect(
    0,
    app.renderer.height - 50,
    app.renderer.width * (player.getBoost() / maxBoost),
    20
  );
  boostBar.endFill();

  scoreManager.addToScore(delta / 10);
  scoreText.text = `Score: ${scoreManager.score}`;

  // Game Over Scenario
  if (player.y > app.renderer.height) {
    app.removeFromStage(player);
    app.removeFromStage(boostBar);
    scoreManager.saveHighScore();
    app.ticker.stop();
    let gameOverText = new Text("Game Over - Refresh", style);
    gameOverText.x = app.renderer.width / 2 - 150;
    gameOverText.y = app.renderer.height / 2;
    app.addToStage(gameOverText);

    app.renderer.view.addEventListener("click", () => {
      app.ticker.start();
      // remove this event listener
      app.renderer.view.removeEventListener("click", () => {});
    });
  }
};

app.ticker.add((delta) => gameLoop(delta));
