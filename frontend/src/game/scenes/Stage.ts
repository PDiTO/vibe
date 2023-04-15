// Manages switching between scenes
import { createSpriteAnims } from "../utils/createAnims";

//
let names = [
  "Rinna",
  "PDiTO",
  "Stani",
  "Do Kwon",
  "Balaji",
  "Vitalik",
  "Kartik",
  "Aya",
  "Masa",
  "Eda",
  "Juan",
  "Dennison",
  "Lasse",
  "Austin",
  "Makoto",
  "Joan",
  "Jon Kol",
  "Christopher",
  "Vera",
  "Jane",
  "Tomohiro",
  "Madeline",
  "Richard",
  "Ken",
  "Jack",
  "Paris",
  "Tomo",
  "Zach",
  "Ilker",
  "Dete",
  "Min",
  "Windra",
  "James",
  "Jeff",
  "Tom",
  "Lion",
  "Flywill",
  "Tomiwa",
  "Rory",
  "Jocelyn",
  "Fabio",
  "Nader",
  "Jess",
  "Brecht",
  "Kirill",
  "Jason",
  "Keisuke",
  "Atsushi",
  "Waka",
  "Asahi",
  "Sarvesh",
  "Kevin",
  "Gen",
  "Kenichiro",
  "Koichi",
  "Nikita",
  "Emily",
  "Richard",
  "Auryn",
  "Pranav",
  "Angus",
  "Miguel",
  "Eric",
  "Deepesh",
  "Akira",
  "Steph",
  "Harsh",
  "Yorke",
  "Takuya",
  "Lukas",
  "Rachit",
  "Alex",
  "Peter",
  "Kenta",
  "Sho",
  "Sarah",
  "Dror",
  "Arisa",
  "Hsiao-Wei",
  "David",
  "Shinichi",
  "Yuhi",
  "Jacob",
  "Tyler",
  "Michele",
  "Blagoj",
  "Casey",
  "Victor",
  "Austin",
  "Kelly",
  "Kefei",
  "Cole",
  "Yuki",
  "Ting Ting",
  "Nico",
  "Noah",
  "Leonardo",
];

// Never displays content directly, instead managers the different scenes to display
export default class SceneStage extends Phaser.Scene {
  constructor() {
    super("Stage");
  }

  preload() {
    createSpriteAnims(this.anims);
  }

  create() {
    this.add.image(637, 360, "bg2").setScale(0.28, 0.28).setOrigin(0.5, 0.5);

    let group = this.physics.add.group();

    for (let i = 0; i < 7; i++) {
      group.add(
        this.physics.add
          .sprite((i + 1) * 165 - 20, 450, "avatar")
          .setScale(1.7, 1.7)
      );
    }

    for (let i = 0; i < 6; i++) {
      group.add(
        this.physics.add
          .sprite((i + 1) * 165 + 63, 500, "avatar")
          .setScale(2.55, 2.55)
      );
    }

    for (let i = 0; i < 7; i++) {
      group.add(
        this.physics.add
          .sprite((i + 1) * 165 - 20, 550, "avatar")
          .setScale(3.4, 3.4)
      );
      this.add
        .text(
          (i + 1) * 165 - 20,
          660,
          names[Phaser.Math.Between(0, names.length - 1)],
          {
            color: "#FFF",
            fontSize: 14,
            align: "center",
            fontFamily: "Arial",
            // stroke: "#000000",
            // strokeThickness: 6,
            backgroundColor: "#000000",

            padding: {
              x: 10,
              y: 5,
            },
          }
        )
        .setOrigin(0.5, 0.5);
    }

    group.getChildren().map((sprite) => {
      let typecastSprite = sprite as Phaser.Physics.Arcade.Sprite;
      typecastSprite.setBounce(0.2);
      typecastSprite.setCollideWorldBounds(true);
      // typecastSprite.setVelocityX(Math.random() * 150);
      // typecastSprite.setVelocityY(Math.random() * 150);
      this.physics.add.existing(typecastSprite);
      typecastSprite.play(`avatar-${Phaser.Math.Between(1, 4)}-anim`);
    });

    // create a collider between all sprites in the group
    this.physics.add.collider(group, group);

    // this.add
    //   .text(320, 320, "rinna.eth", {
    //     color: "#FFF",
    //     fontSize: 48,
    //     align: "center",
    //   })
    //   .setOrigin(0.5, 0.5);
  }
}
