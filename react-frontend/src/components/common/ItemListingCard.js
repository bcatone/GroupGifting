import React from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom"; 

const ItemListingCard = ({ item }) => {
  console.log("item from user.item", item);

  console.log("item.images[0]", item.images[0]);

  const TimeDisplay = ({ timeObject }) => {
    return item.time_until_deadline ? (
      <Box display="flex" alignItems="center">
        <Typography variant="h6" style={{ marginRight: "0.5em" }}>
          Time Left:
        </Typography>
        {Object.entries(timeObject).map(
          ([unit, value]) =>
            value > 0 &&
            unit !== "seconds" && (
              <Typography key={unit} style={{ marginRight: "0.5em" }}>
                {value === 1
                  ? `${value} ${unit.slice(0, -1)}`
                  : `${value} ${unit}`}
              </Typography>
            )
        )}
      </Box>
    ) : null;
  };

return (
  <Grid container spacing={2} justifyContent="center">
    <Grid
      item
      xs={12}
      sm={10}
      md={8}
      style={{ marginTop: "1em", position: "relative" }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ xs: "column", sm: "row" }}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "30px",
          margin: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={item.images[0]}
          sx={{
            maxWidth: { xs: "100%", sm: "200px" },
            maxHeight: { xs: "auto", sm: "200px" },
            objectFit: "cover",
            borderTopLeftRadius: { sm: "30px" },
            borderBottomLeftRadius: { sm: "30px" },
            marginRight: { xs: 0, sm: "16px" },
            marginBottom: { xs: "16px", sm: 0 },
          }}
        />
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingLeft={2}
          paddingRight={2}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            style={{ marginBottom: "8px" }}
          >
            {item.title}
          </Typography>
          <TimeDisplay timeObject={item.time_until_deadline} />
          <Typography variant="h5" align="center" style={{ marginTop: "8px" }}>
            # People Requested
          </Typography>
        </Box>
        <Box position="absolute" top={30} right={15}>
          <Link to={`/items/${item.id}/edit`}>
            <Button>
              <Typography
                variant="h5"
                style={{ marginRight: "1em", transform: "scaleX(-1)" }}
              >
                ✏️
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  </Grid>
);
};
export default ItemListingCard;
