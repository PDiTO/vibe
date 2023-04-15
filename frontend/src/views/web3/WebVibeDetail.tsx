// React
import { useState } from "react";

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

// Utils
import { getContractsForChain } from "../../utils/chainUtils";

// Libraries
import { useAccount, useContractRead, useNetwork } from "wagmi";

// Loads data from chain and responds to chain events
export const Web3VibeDetail = () => {
  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  // Create or update
  const [update, setUpdate] = useState(false);

  // If update should update view, otherwise should create view.
  if (update) {
    <div>Vibe Update</div>;
  } else {
    <div>Vibe New</div>;
  }
};
