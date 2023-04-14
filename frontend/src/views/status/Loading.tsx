// MUI
import { Avatar, Stack, Typography } from "@mui/material";

// MUI Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "../../assets/theme/muiTheme";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Displays rotating faded loading icon
export const Loading = () => {
  return (
    <div className="loading-container">
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "transparent",
            border: "2px solid",
            borderColor: "primary.main",
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            size="1x"
            color={theme.palette.primary.main}
            opacity="0.8"
            className="loading-rotate"
          />
        </Avatar>
        <Typography color="primary" variant="subtitle2">
          Loading...
        </Typography>
      </Stack>
    </div>
  );
};
