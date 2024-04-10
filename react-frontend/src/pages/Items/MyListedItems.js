import React from 'react'
import {
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useSelector } from "react-redux";
import ItemListingCard from '../../components/common/ItemListingCard';

const MyListedItems = () => {



  const loggedInUser = useSelector((state) => state.auth.user);


  const items = loggedInUser?.items;

  const selectedStatus = useSelector((state) => state.item.selectedStatus);

  // Use the selectedStatus to filter the user's items
  const filteredItems = items.filter(
    (item) => item.status === selectedStatus
  );




  return (
    <div>
      {" "}
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        My Listed Items
      </Typography>


      <Grid container>
        {filteredItems.map((item) => <ItemListingCard item={item}/>)}
      </Grid>
    </div>
  );
}

export default MyListedItems