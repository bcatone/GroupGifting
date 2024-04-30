import React, { useEffect } from "react";
import "./BigResultCard.css";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom"; 
import CategoryButton from "../CategoryButton";
import { categories } from "../categories";
import placeholder from "../../../assets/images/placeholder.png"


const BigResultCard = ({ result, index }) => {
  const category = categories.find((cat) => cat.name === result.category);

  // useEffect(() => {
  //   console.log("result from BRC", result);
  // }, [result]);

  console.log("result", result)

  return (
   <Grid item xs={12} sm={6} md={4} key={index}>
      <Link to={`/items/${result.id}`} className="cardLink"> 
        <Card className="card"> 
          <CardActionArea className="cardActionArea"> 
            <CardMedia
              component="img"
              className="cardMedia"
              image={result.images[0] || placeholder}
              alt="green iguana"
            />
            <CardContent className="cardContent"> 
              <Typography gutterBottom variant="h5" component="div" align="center">
                {result.title}
              </Typography>
              {category && category.color && (
                <CategoryButton backgroundColor={category.color} disableHover="true">
                  {result.category}
                </CategoryButton>
              )}
              <h5>City:{result.city}</h5>
              <h4 className="center">{result.username}</h4>
              <Typography variant="body2" color="text.secondary" align="center">
                {result.short_description}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="cardDeadline" align="center"> 
                {result.formatted_deadline}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default BigResultCard;
