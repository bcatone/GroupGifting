import React from "react";
import SideBar from "./SideBar";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link component
import Data from "./TestData.json";

console.log("data", Data);

const ItemLookup = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Item Lookup
        </Typography>
        <SideBar data={Data} />
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {Data.map((result, index) => (
            <Grid item xs={12} sm={4} ms={4} key={index}>
              <Link to={`/items/${result.id}`}>
                {" "}
                {/* Fix Link syntax */}
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ padding: "10px", marginBottom: "30px" }}
                >
                  <CardActionArea
                    style={{ display: "flex", justifyContent: "center", flexDirection:"column" }}
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
                      image={result.img}
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
