import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeOptions from "../utils/themeOptions.js";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/userContext.js";
import { CheckBox } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions.js";
//import { removeNull } from "../utils/removeNull.js";
//import { check } from "prettier";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/jaredsurya/healio">
        Healio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme(themeOptions);

function Auth() {
  const [showPassword, setShowPassword] = useState(false);

  // const { user, setUser } = useContext(UserContext);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isHealer, setIsHealer] = useState(false);

  function checkLoggedIn(){
    if(user){
      navigate("/main")
    }
  }


  // useEffect(() =>{
  //   checkLoggedIn()
  // },[])

  const loginSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          dispatch(setUser(data));
          console.log("User has been logged in!", user);
          navigate("/main");
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
          console.log(err.errors);
        });
      }
    });
  };

  const [userType, setUserType] = useState(null);

  function signupSubmit(event) {
    event.preventDefault();
    setErrors([]);
    const data = new FormData(event.currentTarget);
    const signUpDeets = {
      // full_name: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password"), // Temporarily added this to make password encryption work
      // user_type: data.get("type") ? "healer" : "visitor",
      // allow_email: data.get("allowemail") ? true : false,
      // phone_number: data.get("phone_number"),
    };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({user: signUpDeets}),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          dispatch(setUser(data));
          setUserType(data.type);
          navigate("/main");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
          setErrors(err.errors);
        });
      }
    });
  }

  if (toggle === true) {
    return (
      <ThemeProvider theme={theme}>
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
            <Avatar
              style={{ width: "62px", height: "62px" }}
              sx={{ mt: 3, mb: 2, bgcolor: "primary.main" }}
            >
              <AllInclusiveIcon style={{ width: "54px", height: "54px" }} />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              fontFamily={"Lobster"}
            >
              Sign in to Healio!
            </Typography>
            <Box component="form" onSubmit={loginSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
              />
              {errors
                ? errors.map((err) => (
                    <Typography
                      fontWeight="bold"
                      color={"secondary"}
                      align="center"
                    >
                      {err}
                    </Typography>
                  ))
                : null}
              <Grid item xs={12}>
                <FormControlLabel
                  name="pass"
                  control={
                    <Switch
                      value="true"
                      onChange={() => setShowPassword(!showPassword)}
                      color="secondary"
                    />
                  }
                  label="Reveal the password."
                />
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{
                  mt: 2,
                  mb: 2,
                  marginLeft: 2,
                  borderRadius: 4,
                  color: "",
                  fontWeight: "bold",
                  width: "9em",
                }}
              >
                Sign In
              </Button>
              <Grid container padding={1}>
                <Grid item xs>
                  <Link
                    href="https://lh3.googleusercontent.com/R3js7j_Eks2vycGE6ff6GxhVIycjh-NuLUDltyzfp_NP0xcFkc-d5BJdoisqm7ZqbIKG8Wup9ebVTeVMUrpnMvwvC6Vk-GhXtBlk6GpsVVlU_IHsUFDRokUvfAGPDKJaTQ"
                    variant="body1"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => setToggle(false)}
                    component="button"
                    variant="body1"
                  >
                    {"Don't have an account? Sign Up..."}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 3 }} />
        </Container>
      </ThemeProvider>
    );
  } else {
    // SIGN UP LOGIC BELOW
    return (
      <ThemeProvider theme={theme}>
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
            <Avatar
              style={{ width: "62px", height: "62px" }}
              sx={{ mt: 3, mb: 2, bgcolor: "primary.main" }}
            >
              <AllInclusiveIcon style={{ width: "54px", height: "54px" }} />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              fontFamily={"Lobster"}
            >
              Sign up for Healio
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => signupSubmit(e)}
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
                {isHealer ? (
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
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
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
                        onChange={() => setShowPassword(!showPassword)}
                        color="secondary"
                      />
                    }
                    label="Reveal the password."
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    name="type"
                    onChange={() => setIsHealer(!isHealer)}
                    control={<Checkbox value="true" color="primary" />}
                    label="I am signing up to serve as a HEALER on this website."
                  />
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
                    onClick={() => setToggle(true)}
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
      </ThemeProvider>
    );
  }
}

export default Auth;