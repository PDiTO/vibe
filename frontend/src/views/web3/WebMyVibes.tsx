// React
import { useState } from "react";

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

// UI
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";

// Utils
import { getContractsForChain } from "../../utils/chainUtils";

// Libraries
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { themeColors } from "../../assets/theme/muiTheme";

// Fake vibe data
const vibes: string[] = ["DAO Tokyo", "ETHGlobal Tokyo", "ETH Merge Party"];

// Loads data from chain and responds to chain events
export const Web3MyVibes = () => {
  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  // Create or update
  return (
    <Stack
      direction="column"
      spacing={0}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid container pt={3}>
        <Grid item xs={3} sx={{ textAlign: "start" }}></Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography variant="h4" color="primary">
            My Vibes
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "end" }}>
          <IconButton sx={{ marginRight: 3 }}>
            <FontAwesomeIcon
              icon={faPlus}
              size={"sm"}
              color={themeColors.primary}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {vibes.map((vibe) => (
          <Grid item xs={6} sm={4}>
            <Stack
              marginX={3}
              marginY={3}
              padding={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
                borderRadius: 1,
              }}
            >
              <Typography color="primary" variant="h6">
                {vibe}
              </Typography>
              <Button variant="contained">View</Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
