import * as PIXI from 'pixi.js';

export default class Collectable {
  constructor(container, add, remove) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.height = 20;
    this.sprite.width = 20;
    this.container =  container;
    this.add = add;
    this.remove = remove;

    this.spawn();
  }

  spawn() {
    this.sprite.x = this.container._width;
    this.sprite.y = Math.min(Math.max(Math.random() * this.container._height, 150), this.container._height - 150);
    this.container.addChild(this.sprite);
  }

  update() {
    // Move the collectable to the left
    this.sprite.x -= 2;

    // Remove the collectable from the stage if it's off the screen
    if (this.sprite.x < -20) {
      this.container.removeChild(this.sprite);
      this.remove(this);
    }
  }

  destroy() {
    this.container.removeChild(this.sprite);
    this.remove(this);
  }

}
