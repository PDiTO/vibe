import Phaser from "phaser";

// Game Scenes
//Add here

// The phaser config for the game
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 3200, //canvas size
  height: 2048,
  transparent: true, // no background color
  pixelArt: true, // scale pixel art correctly
  roundPixels: true, // make sure sprites don't bleed into off pixels
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  physics: {
    default: "arcade", // default to arcade style physics
    arcade: {
      gravity: { y: 0 }, // no gravity (isometric game)
      debug: false, // toggle if you want to see bounding boxes etc
    },
  },
  scene: [], // load scenes
  scale: {
    zoom: 1, // starting zoom amount
  },
};
