import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import  flowerhands  from "./images/flowerhands.jpg"
import { HelpOutline } from "@mui/icons-material";


const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const paperStyle = {
    padding: "20px",
    width: isMobile ? "80%" : "600px",
    margin: "0 auto",
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "3.25em", marginBottom: "1em" }}
    >
      <Grid container justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h2">{`Hello, ${user.username}!`}</Typography>
          <img src={flowerhands} className="welcome_pic" alt="Hands holding out a lotus flower"></img>
          <Typography variant="h6" style={{ marginTop: ".5em" }}>
            Where you can learn more about the fascinating realm of plants, log
            and track the health of your botanical friends and share insights
            and connect with other plant enthusiasts by viewing and commenting
            on their green companions.{" "}
          </Typography> 
        </Paper>
      </Grid>
    </div>
  );
};

export default Main;
