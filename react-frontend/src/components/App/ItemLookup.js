import React from 'react'
import LeftBar from './LeftBar'
import { Grid, Card, CardContent, Typography, Container, CardActionArea, CardMedia, CardActions, Button } from "@mui/material"
import Data from './TestData.json'

console.log("data", Data)


const ItemLookup = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Item Lookup
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {Data.map((result, index) => (
            <Grid item xs={12} sm={4} ms={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                   
                    image={result.img}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {result.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "15px" }}
                    >
                      {result.deadline}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ItemLookup;
