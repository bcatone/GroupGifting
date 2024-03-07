import React, {useEffect} from "react";
import { Grid, Typography, Container } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import BigResultCard from "../Common/BigResultCard";
import useItemFilter from "./useItemFilter";

const ItemLookup = () => {
  const {
    items,
    noResults,
    searched,
    searchQuery,
    resetResults,
  } = useItemFilter();
 
    useEffect(() => {
console.log("items from ItemLookup", items)
    }, [items]);


  return (
    <>
      <Container className="content clearfix" maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Item Lookup
        </Typography>

       

        <Grid
          container
          // spacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
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
