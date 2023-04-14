const contractData = require("../config/contracts.json");

export const getContractsForChain = (chain: number | string | undefined) => {
  if (!chain) return contractData[31337];

  const dataForCurrentChain = contractData[chain];
  if (dataForCurrentChain) {
    return dataForCurrentChain;
  } else {
    return contractData[31337];
  }
};
