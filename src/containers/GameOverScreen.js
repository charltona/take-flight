import * as PIXI from 'pixi.js';
import {MENU_INSTRUCTIONS} from '../CONSTANTS.js';
import GameScreen from './GameScreen.js'
export default class GameOverScreen {
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;
  }

  onStart(container) {
    console.log('onStart:GameOverScreen');
    return new Promise((resolve) => {

      /** Setup Elements **/
      const titleText = new PIXI.Text('Game Over', {
        fontFamily: 'Roboto',
        fontSize: 36,
        fill: 0xFFFFFF,
      })

      titleText.x = (container._width - titleText.width) / 2;
      titleText.y = 50;

  ;

      const startGameText = new PIXI.Text('Play Again', {
        fontFamily: 'Roboto',
        fontSize: 24,
        fill: 0xFFFFFF,

      })
      startGameText.buttonMode = true;
      startGameText.eventMode = 'static';
      startGameText.y = (container._height - startGameText.height) / 2;
      startGameText.x = (container._width - startGameText.width) / 2;
      startGameText.on('pointerup', () => {
        this.coordinator.gotoScene(new GameScreen(this.coordinator));
      });

      /** Add Elements to Stage **/
      container.addChild(titleText);
      container.addChild(startGameText);

      resolve();
    })
  }

  onUpdate(delta) {}

  onFinish(delta) {}
}
