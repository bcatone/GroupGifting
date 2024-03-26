import React, { useEffect, useState } from "react";
import { Grid, Typography, Container } from "@mui/material";
import CommonButton from "../../App/Common/CommonButton";
import BigResultCard from "../../App/Common/BigResultCard";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllItems } from "../../../redux/slices/itemSlice";

const ItemLookup = () => {
  const dispatch = useDispatch();

  /// To Do
  //◽️ Get loading set up on this page
  //◽️ Make Display Message for no results
  //◽️

  ////

    const displayedItems = useSelector((state) => state.item.displayedItems);



  useEffect(() => {
    dispatch(fetchAllItems(5));
  }, [dispatch]);



  return (
    <>
      <Container className="content clearfix" maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Item Lookup
        </Typography>

        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ marginTop: "20px", width: "100%" }}
        >
          {displayedItems.length > 0 && Array.isArray(displayedItems) ? (
            displayedItems.map((result, index) => (
              <BigResultCard key={index} result={result} index={index} />
            ))
          ) : (
            <Typography>There were no results, please try again</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ItemLookup;
