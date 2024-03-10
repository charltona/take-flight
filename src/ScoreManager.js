import GameSettings from './GameSettings.js'

class ScoreManager {
  _score;
  _highscore;

  STORAGE_KEY = GameSettings.LOCAL_STORAGE_KEY + GameSettings.GAME_VERSION;

  constructor() {
    this._score = 0;
    this._highscore = this.highscore;
  }

  get score() {
    return Math.ceil(this._score);
  }

  set score(value) {
    this._score = value;
  }

  addToScore(value) {
    this._score += value;
  }

  get highscore() {
    let highScore = localStorage.getItem(this.STORAGE_KEY);
    if (highScore === null) {
      return 0;
    } else {
      return Math.ceil(highScore);
    }
  }

  set highscore(value) {
    let previousHighScore = localStorage.getItem(this.STORAGE_KEY);
    if (previousHighScore === null) {
      localStorage.setItem(this.STORAGE_KEY, value);
      this._highscore = value;
    } else {
      if (value > previousHighScore) {
        localStorage.setItem(this.STORAGE_KEY, value);
        this._highscore = value;
      }
    }
  }

  saveHighScore() {
    this.highscore = this._score;
  }
}

export default ScoreManager;
