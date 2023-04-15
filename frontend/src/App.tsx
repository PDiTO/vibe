// Styling
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme/muiTheme";

// Web3
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

// Views
import { Header } from "./views/header/Header";
import { Status } from "./views/status/Status";

// Libraries
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const { chains, provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai, hardhat],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={client}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Status />
                </>
              }
            />
            <Route path="/vibe/:vibeId" element={<div>Show vibe</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
