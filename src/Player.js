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

  spawn(height) {
    this.position.x = 40;
    this.targetY = height;
    this.position.y = height;
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

  descend() {
    this.targetY -= GameSettings.player.uplift;
    this.targetRotation = Math.PI / 4;
    this.currentBoost -= 5;
    this.targetGravity = 0;

  }

  addBoost(value) {
    this.currentBoost += value;
    if (this.currentBoost > GameSettings.player.maxBoost) {
      this.currentBoost = GameSettings.player.maxBoost;
    }
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
    if (this.targetRotation > 0) {
      this.targetRotation -= GameSettings.player.rotationSpeed;
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
