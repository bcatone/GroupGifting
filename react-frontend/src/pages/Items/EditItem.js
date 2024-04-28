import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import useControlledForm from "../../components/hooks/useControlledForm";
import { categories } from "../../components/common/categories";
import CategoryButton from "../../components/common/CategoryButton";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { updateItemInApi } from "../../redux/slices/itemSlice";

const EditItem = () => {
  const { inputData, errors, isFormValid, handleInputChange, resetForm } =
    useControlledForm();

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [date, setDate] = useState(new Date());
  const [editZip, setEditZip] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [giveMethod, setGiveMethod] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const params = useParams();
  const navigate = useNavigate();



  const user = useSelector((state) => state.auth.user);
  const apiItem = useSelector((state) => state.item.individualItem);

  console.log("apiItem", apiItem);

  const itemId = Number(params.id);

  console.log("itemId", itemId);

  useEffect(() => {
    console.log("selectedImages", selectedImages);
  }, [selectedImages]);

  //// To Do

  /// change dealine stuff to be adding to the deadline
  /// show new deadline

  useEffect(() => {
    setSelectedCategory(apiItem.category);

    // selectedImages
    setSelectedImages(apiItem.images);
    // zip
    setZip(apiItem.zip);
    // city
    setCity(apiItem.city);
    // --- should I have the calendar displayed with the current deadline?
    setGiveMethod(apiItem.giveMethod);
    // giveMethod
    handleInputChange({
      target: { name: "title", value: apiItem.title },
    });
    handleInputChange({
      target: { name: "description", value: apiItem.description },
    });

    setGiveMethod(apiItem.give_method);
  }, [apiItem]);

  /// will need useParams here to get the id of the item

  /// when page renders, set the options to the current options of the item

  useEffect(() => {
    const userZip = user.zip;

    setCity(user.city);
    setZip(userZip);
  }, []);

  useEffect(() => {
    handleInputChange({
      target: { name: "zip", value: zip * 1 },
    });
  }, [zip, handleInputChange]);

  useEffect(() => {
    handleInputChange({
      target: { name: "city", value: city },
    });
  }, [city]);

  useEffect(() => {
    // Add further logic dependent on inputData here
  }, [inputData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedItem = new FormData();

    for (const key in inputData) {
      if (key === "images") {
        const images = inputData[key];
        images.forEach((image, index) => {
          updatedItem.append(`images[]`, image);
        });
      } else {
        updatedItem.append(key, inputData[key]);
      }
    }

    for (const [key, value] of updatedItem.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    if (!selectedImages) {
      alert("Please add at least 1 picture");
      return;
    }

    console.log("updatedItem from handleSubmit", updatedItem);
    // const sendingItem =  item: newItem ;

    dispatch(updateItemInApi({ itemId, updatedItem }))
      .then((action) => {
        if (updateItemInApi.fulfilled.match(action)) {
          console.log("addItemToApi was dispatched!");
          resetForm();
          navigate(`/items/${itemId}`);
          // eventually navigate to Look for Items Page
        } else if (updateItemInApi.rejected.match(action)) {
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

    // Not sure if this will work, temprorally changed to selectedFiles
    /// maybe need to put square brackets around this
    handleInputChange({
      target: { name: "images", value: selectedFilesArray },
    });

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // cleanup funciton
    // event.target.value = "";
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
    const newZip = e.target.value;
    setZip(newZip);
    // Update form data with the new zip value
    handleInputChange({
      target: { name: "zip", value: newZip },
    });
  };

  const handleChangeCity = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    // Update form data with the new city value
    handleInputChange({
      target: { name: "city", value: newCity },
    });
  };

  const handleSetDate = (date) => {
    handleInputChange({
      target: { name: "deadline", value: date.toISOString() },
    });
    setDate(date);
  };

  const handleGiveMethodChange = (event) => {
    const newGiveMethod = event.target.value;
    setGiveMethod(newGiveMethod);

    handleInputChange({
      target: { name: "give_method", value: newGiveMethod },
    });
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Edit your {apiItem.title}
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
                value={inputData.title || ""}
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
                value={inputData.description}
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
                <Typography variant="h5">Zip Code:</Typography>

                <input
                  type="text"
                  style={{
                    marginRight: "1em",
                    fontSize: "20px",
                    color: "black",
                    backgroundColor: editZip ? "white" : "gray",
                  }}
                  disabled={!editZip}
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
                <Typography variant="h5">City:</Typography>
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
              <Typography variant="h5" style={{ marginTop: ".5em" }}>
                Listing will end on:
              </Typography>
              <Typography variant="h5" style={{ marginTop: ".5em" }}>
                {apiItem.formatted_deadline}
              </Typography>
              <Typography variant="h5" style={{ marginTop: ".5em" }}>
                Change end date:
              </Typography>

              <div>
                <Calendar onChange={handleSetDate} minDate={new Date()} />
              </div>

              <Typography variant="h5" style={{ marginTop: ".75em" }}>
                Giving Method:
              </Typography>
              <RadioGroup
                aria-label="image"
                name="image"
                value={giveMethod}
                required
                onChange={(event) => {
                  handleGiveMethodChange(event);
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
            style={{ marginTop: "1em" }}
            className="submit-button"
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditItem;
