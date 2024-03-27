import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AuthHeader from "../Auth/AuthHeader";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Copyright from "../Auth/Copyright";
import { useDispatch } from "react-redux";
import { addUserToApi } from "../../redux/slices/authSlice";
import useControlledForm from "../../hooks/useControlledForm";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

// const theme = createTheme(themeOptions);

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, handleInputChange } = useControlledForm();
  const { isVisible: isPasswordVisable, toggleVisibility: toggleIsPasswordVisible} = useVisibilityToggle();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    dispatch(addUserToApi(formData));
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            bgcolor: "white",
            border: 1,
            borderRadius: 5,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AuthHeader text={"Sign up for Gifting"} />
          <Box
            component="form"
            noValidate
            onSubmit={handleSignupSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} justifyContent="center">
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              {/* {isHealer ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone_number"
                    label="Phone Number (10 digits only please)"
                    name="phone_number"
                    autoComplete="phone_number"
                  />
                </Grid>
              ) : null} */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isPasswordVisable ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
              {/* {errors
                ? errors.map((error) => (
                    <Typography
                      key={error}
                      fontWeight={"bold"}
                      color={"error"}
                      paddingLeft={"2em"}
                    >
                      Error: {error}
                    </Typography>
                  ))
                : null} */}
              <Grid item xs={12}>
                <FormControlLabel
                  name="pass"
                  control={
                    <Switch
                      value="true"
                      onChange={toggleIsPasswordVisible}
                      color="secondary"
                    />
                  }
                  label="Reveal the password."
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  name="type"
                  onChange={() => setIsHealer(!isHealer)}
                  control={<Checkbox value="true" color="primary" />}
                  label="I am signing up to serve as a HEALER on this website."
                /> */}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  name="allowemail"
                  control={<Checkbox value="true" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 4, fontWeight: "bold" }}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="flex-end"
              padding={2}
              paddingTop={0}
            >
              <Grid item>
                <Link
                  onClick={() => navigate("/login")}
                  component="button"
                  variant="body1"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
  );
};

export default Signup;
