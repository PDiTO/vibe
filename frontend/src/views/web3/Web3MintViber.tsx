// React
import { useState } from "react";

// UI
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import head1 from "../../assets/logos/head1.png";
import head2 from "../../assets/logos/head2.png";
import head3 from "../../assets/logos/head3.png";
import head4 from "../../assets/logos/head4.png";

// Views
import { Loading } from "../status/Loading";
import { StageView } from "../stage/StageView";

// Utils
import { getContractsForChain } from "../../utils/chainUtils";

// Libraries
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { vibemanagerContract } from "../../abi/VibeManager";

interface IWeb3MintViber {
  refetchViber: () => void;
}

// Loads data from chain and responds to chain events
export const Web3MintViber = ({ refetchViber }: IWeb3MintViber) => {
  // Name of profile
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [selectedHead, setSelectedHead] = useState(0);

  // Get correct contract addresses for current chain
  const { chain } = useNetwork();
  const contracts = getContractsForChain(chain?.id);

  // Get connected address
  const { address } = useAccount();

  // Prepare tx for speed
  const { config: createViberConfig } = usePrepareContractWrite({
    address: contracts.vibe_manager_address,
    abi: vibemanagerContract.abi,
    functionName: "mintViber",
    args: [name],
  });

  // Submits createViber tx to chain
  const { data: createViberData, write: createViber } = useContractWrite({
    ...createViberConfig,
    onSettled(data, error) {
      if (error) {
        setBusy(false);
      }
    },
  });

  // Listener for createViber contract call
  // If successful, attempts to reload settlemnt from chain (which should now exist)
  useWaitForTransaction({
    hash: createViberData?.hash,
    onSuccess(data) {
      if (data) {
        setBusy(false);
        refetchViber();
      }
    },
  });

  const handleCreateViber = async () => {
    setBusy(true);
    await createViber?.();
  };

  // Create or update
  return (
    <Stack
      className="loading-container"
      direction="column"
      spacing={3}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant="h6" color="primary">
        Choose your avatar and start vibing...
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <IconButton
          onClick={() => {
            setSelectedHead(0);
          }}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 100,
            width: 100,
            border: selectedHead === 0 ? 3 : 0,
            borderColor: "secondary.main",
          }}
        >
          <img src={head1} style={{ width: "80px", height: "80px" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedHead(1);
          }}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 100,
            width: 100,
            border: selectedHead === 1 ? 3 : 0,
            borderColor: "secondary.main",
          }}
        >
          <img src={head2} style={{ width: "80px", height: "80px" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedHead(2);
          }}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 100,
            width: 100,
            border: selectedHead === 2 ? 3 : 0,
            borderColor: "secondary.main",
          }}
        >
          <img src={head3} style={{ width: "80px", height: "80px" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedHead(3);
          }}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 100,
            width: 100,
            border: selectedHead === 3 ? 3 : 0,
            borderColor: "secondary.main",
          }}
        >
          <img src={head4} style={{ width: "80px", height: "80px" }} />
        </IconButton>
      </Stack>
      <TextField
        spellCheck={false}
        size="small"
        placeholder="Give yourself a name"
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
          width: "300px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 2,
        }}
      />
      <Button
        disabled={busy}
        color="primary"
        variant="contained"
        onClick={() => handleCreateViber()}
      >
        Mint Your Viber
      </Button>
    </Stack>
  );
};
