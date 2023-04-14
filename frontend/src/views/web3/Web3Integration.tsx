// React

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

// Utils
import { getContractsForChain } from "../../utils/chainUtils";

// Libraries
import { useAccount, useContractRead, useNetwork } from "wagmi";

// Loads data from chain and responds to chain events
export const Web3Integration = () => {
  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  const isLoading = false;
  const isError = false;

  // If loading show loading screen otherwise, show game view
  if (isError) {
    return <div>Error</div>;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return <StageView />;
  }
};
