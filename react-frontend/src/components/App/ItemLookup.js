import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Grid, Typography, Container } from "@mui/material";

import CommonButton from "./CommonButton";
import { fetchAllItems } from "../../redux/slices/itemSlice";
import BigResultCard from "./BigResultCard";

const ItemLookup = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searched, setSearched] = useState(false);

  const allItems = useSelector((state) => state.item.allItems);

  useEffect(() => {
    dispatch(fetchAllItems());
    setItems(allItems);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("/items/search", {
        params: { q: searchQuery },
      });
      if (response.data.length > 0) {
        setItems(response.data);
        setSearched(true);
      } else {
        setNoResults(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetResults = () => {
    setSearchQuery("");
    setNoResults(false);
    setSearched(false)
    setItems(allItems);
  };

  return (
    <>
      <Container className="content clearfix" maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Item Lookup
        </Typography>

          {noResults === false && searched === false ? (
                <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
              <Typography variant="h5">Search:</Typography>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "200px", height: "30px" }}
              />
              <CommonButton onClick={handleSearch}>Submit</CommonButton>
            </div>
          ) : (
            <div className="center">
              <Typography
                variant="h4"
                style={{ marginBottom: ".75em", marginTop: ".75em" }}
              >
                You searched for {searchQuery}, retry?
              </Typography>
              <CommonButton
                onClick={resetResults}
                style={{ marginLeft: ".5em" }}
              >
                Try Again
              </CommonButton>{" "}
            </div>
          )}
     

        <Grid
          container
          spacing={5}
          style={{ marginTop: "20px", width: "100%" }}
        >
          {noResults ? (
            <div className="center">
              <Typography
                variant="h4"
                style={{ marginBottom: ".75em", marginTop: ".75em" }}
              >
                No Results for {searchQuery}, please
              </Typography>
              <CommonButton
                onClick={resetResults}
                style={{ marginLeft: ".5em" }}
              >
                Try Again
              </CommonButton>
            </div>
          ) : null}
          {!noResults && items
            ? items.map((result, index) => (
                <BigResultCard key={index} result={result} index={index} />
              ))
            : null}
        </Grid>
      </Container>
    </>
  );
};
export default ItemLookup;
