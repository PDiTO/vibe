const { ethers } = require("hardhat");
var fs = require("fs-extra");

module.exports = async ({ deployments, getChainId }) => {
  const user = await ethers.getSigner(1);
  const userAddress = user.address;

  const Vibe = await deployments.get("Vibe");
  const vibe = await ethers.getContractAt("Vibe", Vibe.address);

  const Viber = await deployments.get("Viber");
  const viber = await ethers.getContractAt("Viber", Viber.address);

  const VibeManager = await deployments.get("VibeManager");
  const vibeManager = await ethers.getContractAt(
    "VibeManager",
    VibeManager.address
  );

  // Set manager role
  await vibeManager.mintViber("Rinna");
  await vibeManager.connect(user).mintViber("Paul");

  await vibeManager
    .connect(user)
    .createVibe("DAO Tokyo", "daotokyo", "URL", 1681387206, 1681387206, "");

  await vibeManager
    .connect(user)
    .createVibe(
      "ETH Global Pragma",
      "pragma",
      "URL2",
      1681387206,
      1681387206,
      ""
    );

  await vibeManager
    .connect(user)
    .createVibe(
      "ArtGumi Planet of Us",
      "artgumi",
      "URL",
      1680955206,
      1680955206,
      ""
    );

  await vibeManager
    .connect(user)
    .createVibe("Greenchill", "greenchill", "URL2", 1679572806, 1679572806, "");

  await vibeManager
    .connect(user)
    .createVibe("Green Pill Tokyo", "gpt", "URL2", 1679054406, 1679054406, "");

  await vibeManager
    .connect(user)
    .createVibe(
      "Hacker House zkSync",
      "zkhh",
      "URL2",
      1676635206,
      1676635206,
      ""
    );

  await vibeManager
    .connect(user)
    .createVibe(
      "LUNA Appreciation Day",
      "luna",
      "URL2",
      1673956806,
      1673956806,
      ""
    );

  await vibeManager.joinVibe(1, 1);
  await vibeManager.joinVibe(1, 2);
  await vibeManager.joinVibe(1, 3);
  await vibeManager.joinVibe(1, 4);
  await vibeManager.joinVibe(1, 5);
  await vibeManager.joinVibe(1, 6);
  await vibeManager.joinVibe(1, 7);

  //   string memory _name,
  //   string memory _shortName,
  //   string memory _imageUrl,
  //   uint256 _startDate,
  //   uint256 _endDate,
  //   string memory _eventType
};
