// Manages switching between scenes
// Never displays content directly, instead managers the different scenes to display
export default class SceneStage extends Phaser.Scene {
  constructor() {
    super("Stage");
  }

  preload() {}

  create() {
    // Launch settlement in parallel
    let image = this.add.image(320, 240, "testSprite");
    image.setOrigin(0.5, 0.5);

    this.add
      .text(320, 240, "rinna.eth", {
        color: "#FFF",
        fontSize: 48,
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }
}
