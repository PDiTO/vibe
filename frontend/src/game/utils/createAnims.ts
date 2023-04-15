export const createSpriteAnims = (
  anims: Phaser.Animations.AnimationManager
) => {
  anims.create({
    key: `avatar-1-anim`,
    frames: anims.generateFrameNumbers(`avatar`, {
      frames: [0, 1, 2, 3],
    }),
    repeat: -1,
    frameRate: 4,
  });

  anims.create({
    key: `avatar-2-anim`,
    frames: anims.generateFrameNumbers(`avatar`, {
      frames: [4, 5, 6, 7],
    }),
    repeat: -1,
    frameRate: 4,
  });

  anims.create({
    key: `avatar-3-anim`,
    frames: anims.generateFrameNumbers(`avatar`, {
      frames: [8, 9, 10, 11],
    }),
    repeat: -1,
    frameRate: 4,
  });

  anims.create({
    key: `avatar-4-anim`,
    frames: anims.generateFrameNumbers(`avatar`, {
      frames: [12, 13, 14, 15],
    }),
    repeat: -1,
    frameRate: 4,
  });
};
