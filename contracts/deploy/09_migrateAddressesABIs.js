const { ethers } = require("hardhat");
var fs = require("fs-extra");

module.exports = async ({ deployments, getChainId }) => {
  const Vibe = await deployments.get("Vibe");
  const vibe = await ethers.getContractAt("Vibe", Vibe.address);

  // Load existing file
  const data = fs.readFileSync("../frontend/src/config/contracts.json");

  // Parse JSON
  const existingData = JSON.parse(data);

  const currentChainId = await getChainId();

  existingData[currentChainId] = {
    vibe_address: vibe.address,
  };

  // Write contract addresses to front end constants based on chainId
  const deployedAddresses = JSON.stringify(existingData);

  fs.writeFileSync(
    "../frontend/src/config/contracts.json",
    deployedAddresses,
    function (err, result) {
      if (err) console.log("error: ", err);
    }
  );

  // Copy compiled ABI to front end abi folder for files that are used
  const contractArray = ["Vibe"];

  for (let i = 0; i < contractArray.length; i++) {
    try {
      const filename =
        contractArray[i].split("/")[contractArray[i].split("/").length - 1];
      const from = `./artifacts/contracts/${contractArray[i]}.sol/${filename}.json`;
      const to = `../frontend/src/abi/${contractArray[i]}.ts`;
      const jsonObject = await fs.readJson(from);
      const tsConst = `export const ${filename.toLowerCase()}Contract = ${JSON.stringify(
        jsonObject,
        null,
        2
      )} as const;\n`;

      await fs.writeFile(to, tsConst, "utf8");
      console.log("Conversion successful!");
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
