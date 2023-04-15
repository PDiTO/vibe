const { ethers } = require("hardhat");
var fs = require("fs-extra");

module.exports = async ({ deployments, getChainId }) => {
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
  await vibe.grantRole(vibe.MANAGER_ROLE(), vibeManager.address);
  await viber.grantRole(vibe.MANAGER_ROLE(), vibeManager.address);
};
