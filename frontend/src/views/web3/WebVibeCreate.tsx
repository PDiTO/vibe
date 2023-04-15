// React
import { useState } from "react";

// UI
import { Button, Stack, TextField, Typography } from "@mui/material";

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

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
import { BigNumber } from "ethers";
import { vibemanagerContract } from "../../abi/VibeManager";

// Loads data from chain and responds to chain events
export const Web3VibeCreate = () => {
  // View state
  const [isBusy, setBusy] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  // Form data
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [convertedStartDate, setConvertedStartDate] = useState(
    BigNumber.from(0)
  );
  const [endDate, setEndDate] = useState("");
  const [convertedEndDate, setConvertedEndDate] = useState(BigNumber.from(0));
  const [eventType, setEventType] = useState("");

  const handleStartDateChange = (e: any) => {
    const localDate = e.target.value;
    setStartDate(localDate);

    if (localDate) {
      const date = new Date(localDate);
      const utcTimestamp = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );
      const bigNumberTimestamp = BigNumber.from(
        Math.floor(utcTimestamp / 1000)
      );
      setConvertedStartDate(bigNumberTimestamp);
      console.log(bigNumberTimestamp.toString());
    } else {
      setConvertedStartDate(BigNumber.from(0));
    }
  };

  const handleEndDateChange = (e: any) => {
    const localDate = e.target.value;
    setEndDate(localDate);

    if (localDate) {
      const date = new Date(localDate);
      const utcTimestamp = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );
      const bigNumberTimestamp = BigNumber.from(
        Math.floor(utcTimestamp / 1000)
      );
      setConvertedEndDate(bigNumberTimestamp);
    } else {
      setConvertedEndDate(BigNumber.from(1));
    }
  };

  // Prepare tx for speed
  const { config: createVibeConfig } = usePrepareContractWrite({
    address: contracts.vibe_manager_address,
    abi: vibemanagerContract.abi,
    functionName: "createVibe",
    args: [
      name,
      shortName,
      imageUrl,
      convertedStartDate,
      convertedEndDate,
      eventType,
    ],
  });

  const { data: createVibeData, write: createVibe } = useContractWrite({
    ...createVibeConfig,
    onSettled(data, error) {
      if (error) {
        setBusy(false);
        // Do something
      }
    },
  });

  useWaitForTransaction({
    hash: createVibeData?.hash,
    onSuccess(data) {
      if (data) {
        setSuccess(true);
        setBusy(false);
      }
    },
  });

  const handleCreateVibe = async () => {
    setBusy(true);
    await createVibe?.();
  };

  if (isSuccess) {
    return (
      <div className="loading-container">
        <Typography variant="h6" color="primary">
          Vibe Created
        </Typography>
      </div>
    );
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={3}
      spacing={2}
    >
      <Typography color="primary" variant="h6">
        Create a new vibe
      </Typography>
      <TextField
        spellCheck={false}
        size="small"
        placeholder="The name of the event"
        id="id-name"
        variant="outlined"
        color="primary"
        autoComplete="off"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          input: {
            color: "#1976d2",
            fontSize: 16,
            textAlign: "center",
          },
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />
      <TextField
        spellCheck={false}
        size="small"
        placeholder="A short name for the event"
        id="id-name"
        variant="outlined"
        color="primary"
        autoComplete="off"
        value={shortName}
        onChange={(e) => {
          setShortName(e.target.value);
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          input: {
            color: "#1976d2",
            fontSize: 16,
            textAlign: "center",
          },
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />
      <TextField
        spellCheck={false}
        size="small"
        placeholder="Image url for the event"
        id="id-name"
        variant="outlined"
        color="primary"
        autoComplete="off"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          input: {
            color: "#1976d2",
            fontSize: 16,
            textAlign: "center",
          },
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />
      <TextField
        type="date"
        spellCheck={false}
        size="small"
        placeholder="Start date"
        id="id-name"
        variant="outlined"
        color="primary"
        autoComplete="off"
        value={startDate}
        onChange={(e) => {
          handleStartDateChange(e);
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          input: {
            color: "#1976d2",
            fontSize: 16,
            textAlign: "center",
          },
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />

      <TextField
        type="date"
        spellCheck={false}
        size="small"
        placeholder="End date"
        id="id-name"
        variant="outlined"
        color="primary"
        autoComplete="off"
        value={endDate}
        onChange={(e) => {
          handleEndDateChange(e);
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          input: {
            color: "#1976d2",
            fontSize: 16,
            textAlign: "center",
          },
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />

      <TextField
        spellCheck={false}
        size="small"
        placeholder="The type of event"
        id="id-name"
        variant="outlined"
        color="primary"
        autoComplete="off"
        value={eventType}
        onChange={(e) => {
          setEventType(e.target.value);
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          input: {
            color: "#1976d2",
            fontSize: 16,
            textAlign: "center",
          },
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />

      <Button
        disabled={isBusy}
        color="primary"
        variant="contained"
        onClick={handleCreateVibe}
      >
        Create Vibe
      </Button>
    </Stack>
  );
};
