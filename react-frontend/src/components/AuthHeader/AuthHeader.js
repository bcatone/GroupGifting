import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeOptions from "../utils/themeOptions.js";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Typography from "@mui/material/Typography";

function AuthHeader({ text }) {

  return (
    <>
      <Avatar
        style={{ width: "62px", height: "62px" }}
        sx={{ mt: 3, mb: 2, bgcolor: "primary.main" }}
      >
        <AllInclusiveIcon style={{ width: "54px", height: "54px" }} />
      </Avatar>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        fontFamily={"Lobster"}
      >
        {text}
      </Typography>
    </>
  );
};

export default AuthHeader;
