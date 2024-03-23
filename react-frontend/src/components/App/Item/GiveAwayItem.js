import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  Button,
} from "@mui/material";
import useControlledForm from "../../hooks/useControlledForm";
import { categories } from "../Common/categories";
import CategoryButton from "../Common/CategoryButton";

const GiveAwayItem = () => {
  const { formData, errors, isFormValid, handleInputChange, resetForm } =
    useControlledForm();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("selectedImages", selectedImages);
  }, [selectedImages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedFormData = new FormData(); // Create a new FormData instance

    // Append form data
    for (const key in formData) {
      updatedFormData.append(key, formData[key]);
    }

    // Append the image files
    selectedImages.forEach((image) => {
      updatedFormData.append("pictures[]", image);
    });

    // Now you can use updatedFormData to send the form data including the images

    console.log("Form data:", updatedFormData);
    console.log("Form errors:", errors);
  };

  const handleButtonClick = (category) => {
    if (category.name === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category.name);
    }
  };

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

return (
  <div style={{ marginTop: "2em" }}>
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        Give away an Item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              color="secondary"
              fullWidth
              onChange={handleInputChange}
              value={formData.title || ""}
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              color="secondary"
              fullWidth
              multiline
              rows={10}
              value={formData.description}
              onChange={handleInputChange}
            />
            <div>
              <Typography variant="h5">Category:</Typography>
              <Grid container spacing={1}>
                {categories.map((category) => (
                  <Grid item key={category.name}>
                    <CategoryButton
                      backgroundColor={category.color}
                      value={category.name}
                      onClick={() => handleButtonClick(category)}
                      style={{
                        border:
                          category.name === selectedCategory
                            ? "3px solid black"
                            : null,
                        fontWeight:
                          category.name === selectedCategory
                            ? "bold"
                            : "normal",
                        color:
                          category.name === selectedCategory
                            ? "white"
                            : "black",
                      }}
                    >
                      {category.name}
                    </CategoryButton>
                  </Grid>
                ))}
              </Grid>
            </div>
          </form>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h5" style={{ marginTop: ".75em" }}>
            Select Pictures (Up to 5):
          </Typography>
          <Typography variant="h5" style={{ marginTop: ".75em" }}>
            The first image will be the main image
          </Typography>
          <section className="left">
            <label className="input-label">
              + Add Images
              <br />
              <span>up to 5 images</span>
              <input
                className="file-input"
                type="file"
                name="images"
                onChange={onSelectFile}
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
            </label>
            <br />
            {selectedImages.length > 0 &&
              (selectedImages.length > 5 ? (
                <p className="error">
                  You can't upload more than 5 images! <br />
                  <span>
                    please delete <b> {selectedImages.length - 10} </b> of
                    them{" "}
                  </span>
                </p>
              ) : (
                <button
                  className="upload-btn"
                  onClick={() => {
                    console.log(selectedImages);
                  }}
                >
                  UPLOAD {selectedImages.length} IMAGE
                  {selectedImages.length === 1 ? "" : "S"}
                </button>
              ))}
          </section>
          <Grid container spacing={2} className="images">
            {selectedImages &&
              selectedImages.map((image, index) => (
                <Grid item xs={12} md={6} lg={4} key={image}>
                  <div>
                    <img
                      src={image}
                      alt="upload"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <button onClick={() => deleteHandler(image)}>
                      delete image
                    </button>
                    <p>{index + 1}</p>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  </div>
); }

export default GiveAwayItem;
