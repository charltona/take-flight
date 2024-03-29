import * as PIXI from 'pixi.js';
import {MENU_INSTRUCTIONS} from '../CONSTANTS.js';
import GameScreen from './GameScreen.js'
export default class StartScreen {
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;
  }

  onStart(container) {
    console.log('onStart:StartScreen');
    return new Promise((resolve) => {

      /** Setup Elements **/
      const titleText = new PIXI.Text('Take Flight', {
        fontFamily: 'Roboto',
        fontSize: 36,
        fill: 0xFFFFFF,
      })

      titleText.x = (container._width - titleText.width) / 2;
      titleText.y = 50;

      const instructionText = new PIXI.Text(MENU_INSTRUCTIONS, {
        fontFamily: 'Roboto',
        fontSize: 16,
        fill: 0xFFFFFF,
        align: 'center',
      })

      instructionText.x = (container._width - instructionText.width) / 2 + 50;
      instructionText.y = 150;

      instructionText.style.wordWrap = true;
      instructionText.style.wordWrapWidth = container._width * 0.8 ;

      const startGameText = new PIXI.Text('Start Game', {
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
      container.on("pointerup", () => console.log('...'));



      /** Add Elements to Stage **/
      container.addChild(titleText);
      container.addChild(instructionText);
      container.addChild(startGameText);

      resolve();
    })
  }

  onUpdate(delta) {}

  onFinish(delta) {}
}
