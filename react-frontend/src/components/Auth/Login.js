import React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeOptions from "../utils/themeOptions";
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

const theme = createTheme(themeOptions);

function Login() {
  const navigate = useNavigate();
  const {
    errors,
    isPasswordVisable,
    toggleIsPasswordVisible,
    handleLoginSubmit,
  } = useAuth();

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
          <AuthHeader text={"Sign in to Gift Giving!"} />
          <Box component="form" onSubmit={handleLoginSubmit} noValidate>
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
              type={isPasswordVisable ? "text" : "password"}
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
                    onChange={toggleIsPasswordVisible}
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
                  onClick={() => navigate("/signup")}
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
}

export default Login;
