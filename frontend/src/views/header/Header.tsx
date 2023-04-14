// Styling
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

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
            <Typography
              color="primary"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Vibe
            </Typography>
            {isConnected ? <WalletConnected /> : <WalletDisconnected />}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
