import { Application } from "pixi.js";

class StageManager {
  _app;

  constructor({ mountPoint, width, height } = {}) {
    this.view = mountPoint;
    this.width = width;
    this.height = height;

    this.createApplication();
  }

  createApplication() {
    this._app = new Application({
      width: this.width,
      height: this.height,
      view: this.view,
    });

    document.body.appendChild(this._app.view);
  }

  addToStage(element) {
    this._app.stage.addChild(element);
  }

  removeFromStage(element) {
    this._app.stage.removeChild(element);
  }

  get renderer() {
    return this._app.renderer;
  }

  get ticker() {
    return this._app.ticker;
  }
}

export default StageManager;
