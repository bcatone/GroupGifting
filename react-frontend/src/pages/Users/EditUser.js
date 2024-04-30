import { useEffect, useState } from "react";
import useControlledForm from "../../components/hooks/useControlledForm";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import default_avatar from "../../assets/images/defaultavatar.jpg";
import { states } from "../../components/common/states";
import CommonButton from "../../components/common/CommonButton";
import { updateUserInApi } from "../../redux/slices/userSlice";

const EditUser = () => {
  const { inputData, errors, isFormValid, handleInputChange, resetForm } =
    useControlledForm();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [editedUser, setEditedUser] = useState({ ...user });
  const [selectedState, setSelectedState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...editedUser,
      state: selectedState,
    };

    const userId = user.id;

    /// do I need to do anything special with the avatar data?

    const updatedUserData = new FormData();

    for (const key in inputData) {
      if (key === "avatar" && inputData[key] instanceof File) {
        updatedUserData.append("avatar", inputData[key]);
      } else {
        updatedUserData.append(key, inputData[key]);
      }
    }

  

    for (const [key, value] of updatedUserData.entries()) {
      console.log(`${key}: ${value}`);
    }

    dispatch(updateUserInApi({ userId, updatedUserData }))
      .then((action) => {
        if (updateUserInApi.fulfilled.match(action)) {
          console.log("updateUserInApi was dispatched!");
          // resetForm();

          // eventually navigate to

          // navigate(`/items/${itemId}`);
          // eventually navigate to Look for Items Page
        } else if (updateUserInApi.rejected.match(action)) {
          const error = action.error.message;
          console.error("Error during updateUserInApi:", error);
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

  // const handleUserChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedUser((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    setSelectedState(user.state);
  }, []);

  useEffect(() => {
    handleInputChange({
      target: { name: "email", value: user.email },
    });
    handleInputChange({
      target: { name: "username", value: user.username },
    });
    handleInputChange({
      target: { name: "first_name", value: user.first_name },
    });
    handleInputChange({
      target: { name: "last_name", value: user.last_name },
    });

    handleInputChange({
      target: { name: "city", value: user.city },
    });
    handleInputChange({
      target: { name: "zip", value: user.zip },
    });
  }, [user]);

  return (
    <div style={{ marginTop: "2em" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Edit your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <h3 className="center marg-u-1">Your current avatar:</h3>
              <img
                className="avatarBig"
                src={
                  editedUser.avatar instanceof File
                    ? URL.createObjectURL(editedUser.avatar)
                    : editedUser.avatar || default_avatar
                }
                alt="Avatar"
              />
              <Typography variant="h6" style={{ marginTop: ".75em" }}>
                Change Avatar:
              </Typography>
              <input
                type="file"
                name="avatar"
                accept=".jpg, .jpeg, .png, .webp, .wdp"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setEditedUser({
                    ...user,
                    avatar: selectedFile,
                  });
                  handleInputChange({
                    target: { name: "avatar", value: selectedFile },
                  });
                }}
              />

              <TextField
                label="Email"
                name="email"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={inputData.email || ""}
                required
                style={{ marginBottom: "1em", marginTop: "1em" }}
              />
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={inputData.username || ""}
                required
                style={{ marginBottom: "1em", marginTop: "1em" }}
              />
              <TextField
                label="First Name"
                name="first_name"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={inputData.first_name || ""}
                required
                style={{ marginBottom: "1em", marginTop: "1em" }}
              />
              <TextField
                label="Last Name"
                name="last_name"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={inputData.last_name || ""}
                required
                style={{ marginBottom: "1em", marginTop: "1em" }}
              />

              <TextField
                label="City"
                name="city"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={inputData.city || ""}
                required
                style={{ marginBottom: "1em", marginTop: "1em" }}
              />
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginBottom: "1em", marginTop: "1em" }}
              >
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state-select"
                  style={{ marginBottom: "1em", marginTop: ".3em" }}
                  name="state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  color="secondary"
                  required
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Zip Code"
                name="zip_code"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={handleInputChange}
                value={inputData.zip || ""}
                required
                style={{ marginBottom: "1em" }}
              />
            </Grid>
          </Grid>
          <CommonButton
            type="submit"
            variant="contained"
            color="primary"
            // disabled={!isFormValid}
            style={{ marginTop: "1em" }}
            className="submit-button"
          >
            Submit
          </CommonButton>
        </form>
      </Container>
    </div>
  );
};

export default EditUser;
