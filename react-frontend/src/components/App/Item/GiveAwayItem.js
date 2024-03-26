import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import useControlledForm from "../../hooks/useControlledForm";
import { categories } from "../Common/categories";
import CategoryButton from "../Common/CategoryButton";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addItemToApi } from "../../../redux/slices/itemSlice";

const GiveAwayItem = () => {
  const { formData, errors, isFormValid, handleInputChange, resetForm } =
    useControlledForm();

    const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [date, setDate] = useState(new Date());
  const [editZip, setEditZip] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [duration, setDuration] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [giveMethod, setGiveMethod] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setZip(user.zip);
    setCity(user.city);
  }, []);



  // useEffect(() => {
  //   console.log("selectedImages", selectedImages);
  // }, [selectedImages]);

  const handleSubmit = (event) => {
    event.preventDefault();

console.log("formdata from handleSubmit", formData)

    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    if (!selectedImages) {
      alert("Please add at least 1 picture");
      return;
    }

    dispatch(addItemToApi(formData))
      .then((action) => {
        if (addItemToApi.fulfilled.match(action)) {
          resetForm();
          // eventually navigate to Look for Items Page
        } else if (addItemToApi.rejected.match(action)) {
          const error = action.error.message;
          console.error("Error during addEntryToApi:", error);
          const errorObject = JSON.parse(error);
          const errors = errorObject.errors;
          setFormErrors(errors);
          throw error;
        }
      })
      .catch((error) => {
        console.error("Error during dispatches:", error);
      });

    console.log("Form data:", formData);
    console.log("Form errors:", formErrors);
  };

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
      handleInputChange({ target: { name: "category", value: "" } });
    } else {
      setSelectedCategory(category);
      handleInputChange({ target: { name: "category", value: category } });
    }
  };

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    handleInputChange({
      target: { name: "images", value: imagesArray },
    });

    event.target.value = "";
  };

  function deleteHandler(image, selectedImages) {
    console.log("selectedImages from deleteHandler", selectedImages);

    if (!selectedImages) {
      console.error("selectedImages is undefined");
      return;
    }

    const newSelectedImages = selectedImages.filter((e) => e !== image);

    setSelectedImages(newSelectedImages);

    URL.revokeObjectURL(image);

    handleInputChange({
      target: { name: "images", value: newSelectedImages },
    });
  }

  const handleDurationChange = (weeks) => {
    setCalendar(false);
    const currentDate = new Date();

    const millisecondsInAWeek = weeks * 7 * 24 * 60 * 60 * 1000;

    const futureDate = new Date(currentDate.getTime() + millisecondsInAWeek);

    setDate(futureDate.toISOString());

    handleInputChange({
      target: { name: "deadline", value: futureDate.toISOString() },
    });
  };

  const handleCustomOption = () => {
    setCalendar(true);
  };

  const durationMap = {
    1: 1,
    2: 2,
    3: 3,
    custom: 0,
  };

  const handleChangeZip = (e) => {
    setZip(e.target.value);
    handleInputChange({
      target: { name: "zip", value: e.target.value },
    });
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
    handleInputChange({
      target: { name: "city", value: e.target.value },
    });
  };

  const handleSetDate = (date) => {
    setDate(date);
  };

  // const boxStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "flex-start",
  // };

  return (
    <div style={{ marginTop: "2em" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Give away an Item
        </Typography>
           <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
         
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={formData.title || ""}
                required
                style={{ marginBottom: "1em", marginTop: "1em" }}
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
                required
                style={{ marginBottom: "1em" }}
              />
              <div>
                <Typography variant="h5" style={{ marginBottom: ".5em" }}>
                  Category:
                </Typography>
                <Grid container spacing={1}>
                  {categories.map((category) => (
                    <Grid item key={category.name}>
                      <CategoryButton
                        backgroundColor={category.color}
                        value={category.name}
                        onClick={() => handleCategoryChange(category.name)}
                        // tried to use classNames here but it didn't work
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
            {/* </form> */}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h5" style={{ marginTop: ".75em" }}>
              Select Pictures (Up to 5):
            </Typography>
            <Typography variant="h5" style={{ marginTop: ".75em" }}>
              The first image will be the main displayed image
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
                ) : null)}
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
                      <button
                        onClick={() => deleteHandler(image, selectedImages)}
                      >
                        delete image
                      </button>
                      <p>{index + 1}</p>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
              <Typography variant="h5" style={{ marginRight: ".5em" }}>
                Zip Code:
              </Typography>
              <input
                type="text"
                style={{
                  marginRight: "1em",
                  fontSize: "20px",
                  color: "black",
                  backgroundColor: editZip ? "white" : "gray",
                }}
                disabled={!editZip} // Disable input when editZip is false
                onChange={handleChangeZip}
                value={zip}
                required
              />

              <Button onClick={() => setEditZip(true)}>
                <Typography
                  variant="h5"
                  style={{ marginRight: "1em", transform: "scaleX(-1)" }}
                >
                  ✏️
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
              <Typography variant="h5" style={{ marginRight: ".75em" }}>
                City:
              </Typography>
              <input
                type="text"
                style={{
                  marginRight: "1em",
                  fontSize: "20px",
                  color: "black",
                  backgroundColor: editCity ? "white" : "gray",
                }}
                disabled={!editCity} // Disable input when editZip is false
                onChange={handleChangeCity}
                value={city}
                required
              />
              <Button onClick={() => setEditCity(true)}>
                <Typography
                  variant="h5"
                  style={{ marginRight: "1em", transform: "scaleX(-1)" }}
                >
                  ✏️
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" style={{ marginTop: ".75em" }}>
              Duration of Listing:
            </Typography>
            <RadioGroup
              aria-label="image"
              name="image"
              value={duration}
              required
              onChange={(event) => {
                const value = event.target.value;
                if (value === "custom") {
                  handleCustomOption();
                  setDuration("custom"); // Call your custom function here
                } else {
                  const weeks = durationMap[value];
                  handleDurationChange(weeks);
                  setDuration(value);
                }
              }}
            >
              <FormControlLabel value="1" control={<Radio />} label="1 Week" />
              <FormControlLabel value="2" control={<Radio />} label="2 Weeks" />
              <FormControlLabel value="3" label="3 Weeks" control={<Radio />} />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
            {calendar ? (
              <div>
                <Calendar onChange={handleSetDate} minDate={new Date()} />
              </div>
            ) : null}
            <Typography variant="h5" style={{ marginTop: ".75em" }}>
              Giving Method:
            </Typography>
            <RadioGroup
              aria-label="image"
              name="image"
              value={giveMethod}
              required
              onChange={(event) => {
                setGiveMethod(event.target.value);
              }}
            >
              <FormControlLabel
                value="I Choose"
                control={<Radio />}
                label="I Choose the Recipent"
              />
              <FormControlLabel
                value="Dice"
                control={<Radio />}
                label="Roll the Dice"
              />
            </RadioGroup>
           
          
          </Grid>

        </Grid>
         <Button
              type="submit"
              variant="contained"
              color="primary"
              // disabled={!isFormValid}
              style={{marginTop:"1em"}}
              className="submit-button"
            >
              Submit
            </Button>
                  </form>
      </Container>
    </div>
  );
};

export default GiveAwayItem;
