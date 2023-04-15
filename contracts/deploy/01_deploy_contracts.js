const { deployments, getNamedAccounts } = require("hardhat");

module.exports = async function main() {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Tokens
  const vibe = await deploy("Vibe", {
    from: deployer,
    args: [],
    log: true,
  });

  const viber = await deploy("Viber", {
    from: deployer,
    args: [],
    log: true,
  });

  const vibeManager = await deploy("VibeManager", {
    from: deployer,
    args: [vibe.address, viber.address],
    log: true,
  });
};
