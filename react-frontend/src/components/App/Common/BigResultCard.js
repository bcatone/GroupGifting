import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link component
import CategoryButton from "./CategoryButton";
import { categories } from "./categories";
import placeholder from "../images/placeholder.png";

const BigResultCard = ({ result, index }) => {
  const category = categories.find((cat) => cat.name === result.category);

  // useEffect(() => {
  //   console.log("result from BRC", result);
  // }, [result]);

  return (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Link to={`/items/${result.id}`}>
        <Card
          sx={{
            maxWidth: "300px",
            height: "570px",
            margin: "10px",
          }}
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
                maxHeight: `${260}px`,
                maxWidth: `300px`,
                // borderRadius: "5px",
                objectFit: "contain",
                justifyContent: "center",
              }}
              image={result.images[0] || placeholder}
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
              {category && category.color && (
                <CategoryButton
                  backgroundColor={category.color}
                  disableHover="true"
                >
                  {result.category}
                </CategoryButton>
              )}
              <h5>City:{result.city}</h5>
              <h5>Zip:{result.zip}</h5>
              <Typography variant="body2" color="text.secondary" align="center">
                {result.short_description}
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
};

export default BigResultCard;
