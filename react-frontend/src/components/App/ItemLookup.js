import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Grid,
  Typography,
  Container,
} from "@mui/material";


import CommonButton from "./CommonButton";
import { fetchAllItems } from "../../redux/slices/itemSlice";
import BigResultCard from "./BigResultCard";

const ItemLookup = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false)

  const allItems = useSelector((state) => state.item.allItems);

  useEffect(() => {
    dispatch(fetchAllItems());
    setItems(allItems);
  }, []);

  //// Testing ////
  useEffect(() => {
    console.log("searchQuery", searchQuery);
  }, [searchQuery]);

  /////

  console.log("allItems", allItems);
  console.log("items", items);

  const handleSearch = async () => {
    try {
      const response = await axios.get("/items/search", {
        params: { q: searchQuery },
      });
      if (response.data.length > 0) {
        setItems(response.data);
      } else {
        setNoResults(true)
      }
      console.log("response.data", response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const resetResults = () => {
    console.log("reset results was pushed")
    setSearchQuery("")
    setNoResults(false)
    setItems(allItems)
  }

  return (
    <>
      <Container className="content clearfix" maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Item Lookup
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Search not funcitonal yet */}
          <div>
            <Typography variant="h5">Search:</Typography>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "200px", height: "30px" }}
          />
          <CommonButton onClick={handleSearch}>Submit</CommonButton>
          <CommonButton onClick={resetResults} style={{marginLeft:".5em"}}>Reset</CommonButton>
        </div>

        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {noResults ? <Typography
                variant="h4"
                style={{ marginBottom: ".75em", marginTop: ".75em" }}
              >
                {" "}
                No Results for {searchQuery}, please try again
              </Typography> : null}
          {items && noResults === false ? items?.map((result, index) => (
       <BigResultCard result={result} index={index} />
          )) : null}
        </Grid>
      </Container>
    </>
  );
};

export default ItemLookup;
