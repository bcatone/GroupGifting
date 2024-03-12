import React, { useEffect, useState } from "react";
import { Grid, Typography, Container } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import BigResultCard from "../Common/BigResultCard";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllItems } from "../../../redux/slices/itemSlice";

const ItemLookup = () => {
  const dispatch = useDispatch();

  const [noResults, setNoResults] = useState(false)
  // const { items, setItems, noResults, searched, searchQuery, resetResults } =
  //   useItemFilter();

  // Fetch all items when the component mounts
  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  // Get all items from the Redux store
  const allItems = useSelector((state) => state.item.allItems);



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
         
          { displayedItems && Array.isArray(displayedItems) ? (
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
