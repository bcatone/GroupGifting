import React from "react";
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
