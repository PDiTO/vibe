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
      main: "#c1e9d6", // Mint
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;

export const themeColors = {
  primary: "#186bcc",
  secondary: "#c1e9d6",
};
