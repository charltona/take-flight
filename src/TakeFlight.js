import * as PIXI from 'pixi.js'
import StartScreen from './containers/StartScreen.js'
import * as WebFont from 'webfontloader';
import ScoreManager from './ScoreManager.js'
import GameSettings from './GameSettings.js'
import GameOverScreen from './containers/GameOverScreen.js'

export default class TakeFlight {

  constructor (window, body) {
    PIXI.settings.RESOLUTION = window.devicePixelRatio || 1

    this.app = new PIXI.Application({
      resizeTo: window,
      autoDensity: true,
      backgroundColor: 0x000000,
      // backgroundColor: 0xD40119,
      resolution: window.devicePixelRatio || 1,
    })

    body.appendChild(this.app.view)

    this.app.ticker.add((delta) => this.update(delta))

    window.WebFontConfig = {
      active: () => this.gotoScene(new StartScreen(this)),
    }
    WebFont.load({
      active: () => this.gotoScene(new StartScreen(this)),
      google: {
        families: ['Roboto']
      }
    })

    this.scoreManager = new ScoreManager();
    this.gameSettings = GameSettings;
    this.currentContainer = undefined;
  }

  async gotoScene (newScene) {
    if (this.currentScene !== undefined) {
      await this.currentScene.onFinish()
      this.app.stage.removeChildren()
    }
    // This is the stage for the new scene
    const container = new PIXI.Container()
    container.width = this.WIDTH
    container.height = this.HEIGHT
    container.scale.x = this.actualWidth() / this.WIDTH
    container.scale.y = this.actualHeight() / this.HEIGHT
    container.x = this.app.screen.width / 2 - this.actualWidth() / 2
    container.y = this.app.screen.height / 2 - this.actualHeight() / 2

    // Start the new scene and add it to the stage
    await newScene.onStart(container)
    this.app.stage.addChild(container)
    this.currentScene = newScene

  }

  update (delta) {
    if (this.currentScene !== undefined) {
      this.currentScene.onUpdate(delta, this.currentContainer)
    }
  }

  get WIDTH() {
    return 375;
  }

  get HEIGHT() {
    return 667;
  }

  actualWidth() {
    const { width, height } = this.app.screen;
    const isWidthConstrained = width < height * 9 / 16;
    return isWidthConstrained ? width : height * 9 / 16;
  }

  actualHeight() {
    const { width, height } = this.app.screen;
    const isHeightConstrained = width * 16 / 9 > height;
    return isHeightConstrained ? height : width * 16 / 9;
  }

}
