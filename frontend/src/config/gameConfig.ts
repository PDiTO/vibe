import Phaser from "phaser";
import ScenePreloader from "../game/scenes/Preloader";
import SceneManager from "../game/scenes/Manager";
import SceneStage from "../game/scenes/Stage";

// Game Scenes
//Add here

// The phaser config for the game
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640, //canvas size
  height: 480,
  transparent: false, // no background color
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
  scene: [ScenePreloader, SceneManager, SceneStage], // load scenes
  scale: {
    zoom: 1, // starting zoom amount
  },
};
