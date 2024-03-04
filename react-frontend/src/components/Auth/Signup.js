import React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "./useAuth";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AuthHeader from "./AuthHeader";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Copyright from "./Copyright";

// const theme = createTheme(themeOptions);

function Signup() {
  const navigate = useNavigate();
  const {
    errors,
    isPasswordVisable,
    toggleIsPasswordVisible,
    handleSignupSubmit,
  } = useAuth();

  return (
    // <ThemeProvider theme={theme}>
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
                />
              </Grid>
              {errors
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
                : null}
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
    // </ThemeProvider>
  );
};

export default Signup;
