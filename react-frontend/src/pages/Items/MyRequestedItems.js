import React from 'react'
import { Grid, Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";
import ItemListingCard from "../../components/common/ItemListingCard";


const MyRequestedItems = () => {

       const user = useSelector((state) => state.auth.user);

       const itemRequests = useSelector((state) => state.itemRequests);

       console.log("itemRequests", itemRequests);

       // Filter the item requests related to the current user
       const userItemRequests = itemRequests.filter(
         (itemRequest) => itemRequest.user_id === user.id
       );

       const items = userItemRequests.map((itemRequest) => itemRequest.item);

       console.log("userItemRequests", userItemRequests);
  return (
    <div>
      {" "}
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        My Requested Items
      </Typography>
      <Grid container>
        {items.map((item) => (
          <ItemListingCard item={item} />
        ))}
      </Grid>
    </div>
  );
}

export default MyRequestedItems