// Styling
import { Button, Stack, Typography } from "@mui/material";

// Web3
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

// Views
import { Web3MyVibes } from "../web3/WebMyVibes";
import { Route, Routes } from "react-router-dom";
import { Web3ShowStage } from "../web3/Web3ShowStage";
import { Web3VibeCreate } from "../web3/WebVibeCreate";

// Handles which view to show based on wallet status
export const Status = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  // Connected, wrong network
  if (isConnected && chain?.unsupported) {
    return (
      <Stack
        height={"90vh"}
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography color="primary" variant="h6">
          The current network is not supported
        </Typography>
        {chains.map((x) => (
          <Button
            variant="contained"
            color="secondary"
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            Switch to {x.name}
          </Button>
        ))}
      </Stack>
    );
  }

  // Connected, correct network
  if (isConnected) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Web3MyVibes />
            </>
          }
        />
        <Route path="/vibe/:vibeId" element={<Web3ShowStage />} />
        <Route path="/create" element={<Web3VibeCreate />} />
      </Routes>
    );
  }

  // Not connected
  return (
    <Stack
      height={"90vh"}
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Typography color="primary" variant="h6">
        Please connect your wallet to continue
      </Typography>
    </Stack>
  );
};
