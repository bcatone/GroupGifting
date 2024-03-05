import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link component

const BigResultCard = ({result, index}) => {
  return (
    <Grid item xs={12} sm={4} ms={4} key={index}>
      <Link to={`/items/${result.id}`}>
        <Card
        sx={{
    width: 300,
    height: 500,
    margin: "10px"}}
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
                objectFit: "contain",
                justifyContent: "center",
           
              }}
              image={
                result.images[0] ||
                "https://www.traceyroad.com/wp-content/plugins/elementor/assets/images/placeholder.png"
              }
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
              <Typography variant="body2" color="text.secondary" align="center">
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
        </Card>
      </Link>
    </Grid>
  );
}

export default BigResultCard