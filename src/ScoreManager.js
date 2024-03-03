class ScoreManager {
  _score;
  _highscore;

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
    let highScore = localStorage.getItem("highScore");
    if (highScore === null) {
      return 0;
    } else {
      return Math.ceil(highScore);
    }
  }

  set highscore(value) {
    let previousHighScore = localStorage.getItem("highScore");
    if (previousHighScore === null) {
      localStorage.setItem("highScore", value);
      this._highscore = value;
    } else {
      if (value > previousHighScore) {
        localStorage.setItem("highScore", value);
        this._highscore = value;
      }
    }
  }

  saveHighScore() {
    this.highscore = this._score;
  }
}

export default ScoreManager;
