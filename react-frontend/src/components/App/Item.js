import React from 'react'
import { Box, Typography, Grid } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import Data from "./TestData.json";

const Item = ({ memoizedPlant }) => {
      const params = useParams();
      const id = Number(params.id);

    const data = Data

    const selectedItem = data.find((item => item.id === id))

    console.log(selectedItem)


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "3em",
          marginTop: "1em",
        }}
      >
        <Typography variant="h4" align="center" style={{ marginTop: "1em" }}>
          {selectedItem.title}
        </Typography>
      </Box>
      <div className="pos_top margT2">
        <img
          className="img_deg margT3"
          alt="plant"
          src={selectedItem.img}
        />
        <div className="text-box margT2">
          <p className="desc">{selectedItem.description}</p>
        </div>
        <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
          <div className="button_box margT2 margB2">
            <p>Added on {selectedItem.create_date}</p>
          </div>
          {/* <Grid container spacing={1}>
            <Grid container item spacing={3}>

            </Grid>
          </Grid> */}
        </Box>
      </div>
    </>
  );
};

export default Item;