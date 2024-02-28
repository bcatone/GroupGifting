import React from "react";
// import CommonButton from "./common/CommonButton";
import { useSelector } from "react-redux";
import {
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  Button
} from "@mui/material";

const Main = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const paperStyle = {
    padding: "20px",
    width: isMobile ? "80%" : "600px",
    margin: "0 auto",
  };

    const items = useSelector((state) => state.item.allItems);
    const state = useSelector((state) => console.log("state", state))

    console.log("items", items)

  return (
    <div
      style={{ textAlign: "center", marginTop: "3.25em", marginBottom: "1em" }}
    >
      <Grid container justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h2">Welcome User!</Typography>


<Typography> Logged in user landing page</Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Main;
