import React from 'react'
import { Grid, Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";
import ItemListingCard from "../../components/common/ItemListingCard";


const MyRequestedItems = () => {
  const user = useSelector((state) => state.auth.user);
  const itemRequests = useSelector((state) => state.itemRequests);

  // Filter the item requests related to the current user
  const userItemRequests = itemRequests.filter(
    (itemRequest) => itemRequest.user_id === user.id
  );

  console.log("userItemRequests", userItemRequests[0].item)

  return (
    <div>
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        My Requested Items
      </Typography>
      <Grid container>
        {userItemRequests.map((itemRequest) => (
          <ItemListingCard item={itemRequest.item} key={itemRequest.item.id} />
        ))}
      </Grid>
    </div>
  );
};

export default MyRequestedItems