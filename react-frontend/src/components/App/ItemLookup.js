import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link component
import Data from "./TestData.json";
import CommonButton from "./CommonButton";
import { fetchAllItems } from "../../redux/slices/itemSlice";


const ItemLookup = () => {
      const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAllItems());
    }, []);

    const items = useSelector((state) => state.item.allItems);

    console.log("items", items)


  return (
    <>
      <Container className="content" maxWidth="lg">
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
          <input type="text" style={{ width: "200px", height: "30px" }} />
          <CommonButton>Submit</CommonButton>
        </div>

        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {items.map((result, index) => (
            <Grid item xs={12} sm={4} ms={4} key={index}>
              <Link to={`/items/${result.id}`}>
                {" "}
                {/* Fix Link syntax */}
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ padding: "10px", marginBottom: "30px" }}
                >
                  <CardActionArea
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{
                        height: `${345}px`,
                        width: `345px`,
                        // borderRadius: "5px",
                        objectFit: "cover",
                        justifyContent: "center",
                      }}
                      image={result.images[0]}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        {result.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {result.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ marginTop: "15px" }}
                        align="center"
                      >
                        {result.deadline}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ItemLookup;
