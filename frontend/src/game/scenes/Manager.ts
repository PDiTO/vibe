// Manages switching between scenes
// Never displays content directly, instead managers the different scenes to display
export default class SceneManager extends Phaser.Scene {
  constructor() {
    super("Manager");
  }

  preload() {}

  create() {
    // Launch settlement in parallel
    this.scene.launch("Stage");
  }
}
