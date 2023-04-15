// React

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

// Utils
import { getContractsForChain } from "../../utils/chainUtils";

// Libraries
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { vibemanagerContract } from "../../abi/VibeManager";
import Vibe from "../../models/Vibe";
import { useState } from "react";
import Vibee from "../../models/Vibee";
import { vibeContract } from "../../abi/Vibe";
import { BigNumber } from "ethers";

// Loads data from chain and responds to chain events
export const Web3ShowStage = () => {
  // State
  const [vibe, setVibe] = useState<Vibe | undefined>(undefined);
  const [vibees, setVibees] = useState<Vibee[]>([]);

  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  // Get vibe id
  let { vibeId } = useParams();
  let convertedId = BigNumber.from(parseInt(vibeId ?? "0"));

  useContractRead({
    address: contracts.vibe_address,
    abi: vibeContract.abi,
    functionName: "getVibeAndVibees",
    args: [convertedId],
    onSuccess(vibeVibeesData) {
      try {
        const loadedViber = new Vibe(vibeVibeesData[0]);
        setVibe(loadedViber);
        var tempVibees: Vibee[] = [];
        vibeVibeesData[1].map((vibee) => {
          tempVibees.push(new Vibee(vibee));
        });
        setVibees(tempVibees);
        console.log(tempVibees);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating Viber / Vibe instance:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
    },
    onError(error) {
      setVibe(undefined);
      setVibees([]);
    },
  });

  const isLoading = false;
  const isError = false;

  // If loading show loading screen otherwise, show game view
  if (isError) {
    return <div>Error</div>;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <StageView />
        <Stack
          direction="column"
          className="stage-summary-container"
          alignItems="flex-start"
          spacing={0}
        >
          <Typography sx={{ color: "white" }} variant="h6">
            {vibe?.name ?? ""}
          </Typography>
          <Typography
            sx={{ color: "white" }}
            variant="subtitle1"
            color="primary"
            mt={-1}
          >
            {vibe?.dateString() ?? ""}
          </Typography>
        </Stack>
      </>
    );
  }
};
