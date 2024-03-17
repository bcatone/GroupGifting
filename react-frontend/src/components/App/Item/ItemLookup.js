import React, { useEffect, useState } from "react";
import { Grid, Typography, Container } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import BigResultCard from "../Common/BigResultCard";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllItems } from "../../../redux/slices/itemSlice";

const ItemLookup = () => {
  const dispatch = useDispatch();

  const [noResults, setNoResults] = useState(false);

  /// To Do
  //◽️ Get loading set up on this page
  //◽️ Make Display Message for no results
  //◽️

  ////
/// how could I get the distance param here??? Put it in useItemFilter??
  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  const displayedItems = useSelector((state) => state.item.displayedItems);

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
          {displayedItems && Array.isArray(displayedItems) ? (
            displayedItems.map((result, index) => (
              <BigResultCard key={index} result={result} index={index} />
            ))
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ItemLookup;
