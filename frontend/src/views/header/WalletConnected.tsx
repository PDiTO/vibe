//Styling
import { Button, Stack } from "@mui/material";

// Web3
import { useAccount, useDisconnect, useEnsName } from "wagmi";

// Returns a disconnect button if the user's wallet is connected
// The button contains the users ENS name or a truncated version of their address
export const WalletConnected = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Button variant="contained" onClick={() => disconnect()}>
        {ensName ? ensName : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
      </Button>
    </Stack>
  );
};
