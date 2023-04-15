// Styling
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import vibeLogo from "../../assets/logos/vibe_logo_red.png";

// Web3
import { useAccount } from "wagmi";

// Views
import { WalletDisconnected } from "./WalletDisconnected";
import { WalletConnected } from "./WalletConnected";

// Returns the header bar for the dapp
export const Header = () => {
  const { isConnected } = useAccount();

  return (
    <div className="header-container">
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Box
              component="img"
              sx={{
                height: 30,
                width: 80,
                maxWidth: 80,
                flexGrow: 1,
              }}
              src={vibeLogo}
            />
            <Typography
              color="primary"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            {isConnected ? <WalletConnected /> : <WalletDisconnected />}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
