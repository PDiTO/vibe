// Sprites
import avatar from "../assets/sprites/avatar.png";
import bg1 from "../assets/bg/vibe_bg_hackathon.png";
import bg2 from "../assets/bg/vibe_bg_infinite_garden.png";

export default class ScenePreloader extends Phaser.Scene {
  constructor() {
    //Set name of scene
    super("Preloader");
  }

  preload() {
    // Progress Bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x186bcc, 0.3);
    progressBox.fillRoundedRect(1475, 1024, 250, 10, 5);

    // Progress events
    this.load.on("progress", function (value: any) {
      progressBar.clear();
      progressBar.fillStyle(0x186bcc, 1);
      progressBar.fillRoundedRect(1477, 1026, 246 * value, 6, 3);
    });
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
    });

    // Load sprites here
    this.load.spritesheet("avatar", avatar, {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Load background
    this.load.image("bg1", bg1);
    this.load.image("bg2", bg2);
  }

  create() {
    // Replace preloader scene with manager scene once preloading complete
    this.scene.start("Manager");
  }
}
