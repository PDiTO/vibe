// Styling
import { Button, IconButton, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";

// Web3
import { useConnect } from "wagmi";

// Returns a button allowing the user to connect their wallet to the dapp
// Also returns buttons to socials
export const WalletDisconnected = () => {
  const { connect, connectors } = useConnect();

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <IconButton color="primary" target="_blank" href="https://discord.gg/">
        <FontAwesomeIcon icon={faDiscord} size={"sm"} />
      </IconButton>
      <IconButton
        color="primary"
        target="_blank"
        href="https://www.twitter.com/"
      >
        <FontAwesomeIcon icon={faTwitter} size={"sm"} />
      </IconButton>
      {connectors.map((connector) => (
        <Button
          variant="contained"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect
        </Button>
      ))}
    </Stack>
  );
};
