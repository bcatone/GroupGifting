import React from "react";
import { Grid, Typography, Container, TextField, Box } from "@mui/material";
import useControlledForm from "../../hooks/useControlledForm";

const GiveAwayItem = () => {
  const { formData, errors, isFormValid, handleInputChange, resetForm } =
    useControlledForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    // form submission logic
    console.log("Form data:", formData);
    console.log("Form errors:", errors);
  };
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          style={{ marginTop: "50px", textAlign: "center" }}
        >
          Give away an Item
        </Typography>
        <Box sx={boxStyle}>
          <form
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%", padding:"5%" }}
          >
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              color="secondary"
              style={{
                marginBottom: "1em",
                marginTop: "1em",
                backgroundColor: "#FDFDFD",
                width: "60%",
              }}
              onChange={handleInputChange}
              value={formData.title || ""}
            />
            {/* <p>{errors.title}</p> */}
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              color="secondary"
              style={{
                // marginTop: "em",
                backgroundColor: "#FDFDFD",
                width: "80%",
              }}
              multiline
              rows={10}
              value={formData.description}
              onChange={handleInputChange}
            />

            {/* <button type="submit" disabled={!isFormValid}>
              Submit
            </button> */}
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default GiveAwayItem;
