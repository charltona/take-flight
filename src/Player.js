import { Sprite, Texture } from "pixi.js";
import GameSettings from "./GameSettings";

class Player extends Sprite {
  constructor(texture) {
    super(texture);

    this.name = "player";
    this.scale.set(GameSettings.player.scale);
    this.targetY = this.position.y;
    this.targetRotation = 0;
    this.gravity = GameSettings.world.gravity;
    this.targetGravity = 0;
  }

  spawn() {
    this.position.x = 40;
    console.log(this.parent);

    this.position.y = this.parent.height;
    this.currentBoost = GameSettings.player.maxBoost;
  }

  jump() {
    console.log("jump");
    if (this.currentBoost > 0) {
      this.targetY += GameSettings.player.uplift;
      this.targetGravity = 0;
      this.currentBoost -= 5;
      this.targetRotation = -Math.PI / 4;
    }
  }

  addBoost(value) {
    this.currentBoost += value;
  }

  getBoost() {
    return this.currentBoost;
  }

  update() {
    this.targetY += this.targetGravity;
    this.position.y += (this.targetY - this.position.y) * 0.1;
    this.rotation += (this.targetRotation - this.rotation) * 0.01;
    if (this.targetRotation < 0) {
      this.targetRotation += GameSettings.player.rotationSpeed;
    }
    if (this.targetGravity < this.gravity) {
      this.targetGravity += GameSettings.player.glideTime;
    }
    if (this.currentBoost > 0) {
      this.currentBoost -= GameSettings.player.boostDecay;
    }
  }
}

export default Player;
