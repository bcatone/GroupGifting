import React, { useEffect, useState} from "react";
// import CommonButton from "./common/CommonButton";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  Button
} from "@mui/material";
import { fetchAllItems } from "../../redux/slices/itemSlice";

const Main = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch();

  const paperStyle = {
    padding: "20px",
    width: isMobile ? "80%" : "600px",
    margin: "0 auto",
  };

    const items = useSelector((state) => state.item.allItems);
    const auth = useSelector((state) => state.auth)
    

    console.log("auth", auth)

    useEffect(()=> {
 dispatch(fetchAllItems())

    }, [])
    console.log("items", items)

  return (
    <div
      style={{ textAlign: "center", marginTop: "3.25em", marginBottom: "1em" }}
    >
      <Grid container justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h2">Welcome {auth.user.first_name}!</Typography>


<Typography> Logged in user landing page</Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Main;
