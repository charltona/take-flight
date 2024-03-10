const gameSettings = {
  GAME_VERSION: '0.0.1',
  LOCAL_STORAGE_KEY: 'TAKE_FLIGHT_SCORE_',
  world: {
    gravity: 0.5,
    gameSpeed: 1,
  },

  player: {
    uplift: -100,
    maxBoost: 100,
    boostDecay: 0.01,
    scale: 0.2,
    rotationSpeed: 0.01,
    glideTime: 0.002,
  },
};

export default gameSettings;
