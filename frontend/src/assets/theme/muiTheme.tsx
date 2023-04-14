// MUI
import { createTheme } from "@mui/material";

// Define MUI theme
export const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    //   primary : {
    //       main: "abcd12"
    //   },
    secondary: {
      main: "#C1E9D6", // Mint
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
