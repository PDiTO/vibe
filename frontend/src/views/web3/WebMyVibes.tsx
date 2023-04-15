// React
import { useState } from "react";

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

// UI
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { themeColors } from "../../assets/theme/muiTheme";
import { faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";

// Images
import artgumi from "../../assets/logos/event_dummy_artgumi.png";
import daotokyo from "../../assets/logos/event_dummy_daotokyo.png";
import greenchill from "../../assets/logos/event_dummy_greenchill.png";
import ethglobal from "../../assets/logos/event_dummy_hackathon.png";
import zkhh from "../../assets/logos/event_dummy_hackerhouse.png";
import luna from "../../assets/logos/event_dummy_luna.png";
import pragma from "../../assets/logos/event_dummy_pragma.png";
import publicgood from "../../assets/logos/event_dummy_publicgood.png";
import placeholder from "../../assets/logos/event_empty.png";

// Utils
import { getContractsForChain } from "../../utils/chainUtils";

// Libraries
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { viberContract } from "../../abi/Viber";
import Viber from "../../models/Viber";
import { Web3MintViber } from "./Web3MintViber";
import { vibemanagerContract } from "../../abi/VibeManager";
import { BigNumber } from "ethers";
import Vibe from "../../models/Vibe";

// Fake vibe data
const vibes: string[] = ["DAO Tokyo", "ETHGlobal Tokyo", "ETH Merge Party"];

// Loads data from chain and responds to chain events
export const Web3MyVibes = () => {
  // Users profile
  const [viber, setViber] = useState<Viber | undefined>(undefined);
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [adminVibes, setAdminVibes] = useState<Vibe[]>([]);

  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  // Get navigate
  const navigate = useNavigate();

  // Get profile if exists
  const { refetch: refetchVibes } = useContractRead({
    address: contracts.vibe_manager_address,
    abi: vibemanagerContract.abi,
    functionName: "getViberAndVibes",
    args: address && [address],
    onSuccess(viberVibesData) {
      try {
        const loadedViber = new Viber(viberVibesData.viber);
        setViber(loadedViber);
        var tempVibes: Vibe[] = [];
        viberVibesData[1].map((vibe) => {
          tempVibes.push(new Vibe(vibe));
        });
        setVibes(tempVibes);

        var tempAdminVibes: Vibe[] = [];
        viberVibesData[2].map((vibe) => {
          tempAdminVibes.push(new Vibe(vibe));
        });
        setAdminVibes(tempAdminVibes);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating Viber / Vibe instance:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
    },
    onError(error) {
      setViber(undefined);
    },
  });

  // Prepare tx for speed
  const { config: joinVibeConfig } = usePrepareContractWrite({
    address: contracts.vibe_manager_address,
    abi: vibemanagerContract.abi,
    functionName: "joinVibe",
    args: viber && [viber.id, BigNumber.from(1)],
  });

  // Submits createViber tx to chain
  const { data: joinVibeData, write: joinVibe } = useContractWrite({
    ...joinVibeConfig,
    onSettled(data, error) {
      if (error) {
      }
    },
  });

  // Listener for createViber contract call
  // If successful, attempts to reload settlemnt from chain (which should now exist)
  useWaitForTransaction({
    hash: joinVibeData?.hash,
    onSuccess(data) {
      if (data) {
        refetchVibes();
      }
    },
  });

  const handleJoinVibe = async () => {
    await joinVibe?.();
  };

  if (!viber || viber.id.toString() === "0") {
    return <Web3MintViber refetchViber={refetchVibes} />;
  }

  // Show vibes
  return (
    <Stack
      direction="column"
      spacing={0}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid container pt={3}>
        <Grid item xs={3} sx={{ textAlign: "start" }}></Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }} marginY={3}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h4" color="primary">
              {`${viber.name}'s Vibes`}
            </Typography>
            <Button
              onClick={() => {
                navigate("/create");
              }}
              variant="contained"
              color="primary"
            >
              Create New Event
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "end" }}></Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        maxWidth={800}
      >
        {adminVibes.map((vibe, index) => (
          <Grid item xs={4} sm={3} key={index}>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <IconButton
                onClick={() => {
                  navigate(`/vibe/${vibe.id.toNumber()}`);
                }}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
                  height: 100,
                  width: 100,
                  border: 3,
                  borderColor: "secondary.main",
                }}
              >
                <img
                  src={ethglobal}
                  style={{ width: "86px", height: "86px" }}
                />
              </IconButton>
              <Stack
                direction="column"
                spacing={0}
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography color="primary" textAlign="center">
                  {vibe.name}
                </Typography>
                <Typography color="primary" variant="caption">
                  {vibe.dateString()}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}

        {vibes.map((vibe, index) => (
          <Grid item xs={4} sm={3} key={index} padding={2}>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <IconButton
                onClick={() => {
                  navigate(`/vibe/${vibe.id.toNumber()}`);
                }}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
                  height: 100,
                  width: 100,
                  border: 3,
                  borderColor: "transparent",
                }}
              >
                <img
                  src={
                    vibe.shortName === "artgumi"
                      ? artgumi
                      : vibe.shortName === "daotokyo"
                      ? daotokyo
                      : vibe.shortName === "greenchill"
                      ? greenchill
                      : vibe.shortName === "pragma"
                      ? pragma
                      : vibe.shortName === "gpt"
                      ? publicgood
                      : vibe.shortName === "zkhh"
                      ? zkhh
                      : vibe.shortName === "luna"
                      ? luna
                      : placeholder
                  }
                  style={{ width: "100px", height: "100px" }}
                />
              </IconButton>
              <Stack
                direction="column"
                spacing={0}
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography color="primary" textAlign="center">
                  {vibe.name}
                </Typography>
                <Typography color="primary" variant="caption">
                  {vibe.dateString()}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
