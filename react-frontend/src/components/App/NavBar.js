import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext } from "react";
import themeOptions from "../utils/themeOptions";
import UserContext from "../utils/userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/actions/authActions";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = true
  //const user = useSelector((state) => state.auth.user)
  const settings = [
    "My Account",
    "My Saved Items",
    "About Group Gifting",
    "Log out",
  ];
  const pages = [
    "Welcome",
    "Give Items",
    "Search for Items",
    "Donation Information",
    "Connections",
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavMenuClick = (page) => {
    switch (page) {
      case "Welcome":
        navigate("/main");
        break;
      case "Services ∞ Healers":
        navigate("/main/finder");
        break;
      case "Map":
        navigate("/main/map");
        break;
      case "Quotes":
        navigate("/main/quotes");
        break;
      case "Featured Healer":
        navigate("/main/featuredhealer");
        break;
    }
    setAnchorElNav(null);
  };

  const handleUserMenuClick = (setting) => {
    switch (setting) {
      case "My Profile":
        navigate("/main/myprofile");
        break;
      case "My Saved Services":
        navigate("/main/mysaved");
        break;
      case "About Healio":
        navigate("/main/about");
        break;
      case "Log out":
        handleLogout();
        break;
    }
    setAnchorElUser(null);
  };

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      console.log("response", r);
      if (r.ok) {
        dispatch(clearUser());
        navigate("/login");
        console.log("THE USER WAS SIGNED OUT");
      } else {
        console.error("SOMETHING WENT WRONG", r);
      }
    });
  }

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
        <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={() => navigate("/about")}
                sx={{
                  fontFamily: "arial",
                  fontWeight: 600,
                  color: "black",
                  textDecoration: "none",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Group Gifting
              </Typography>
              <Typography
                variant="p"
                noWrap
                component="a"
                onClick={() => navigate("/items")}
                sx={{
                  fontFamily: "",
                  fontWeight: 500,
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    cursor: "pointer",
                  },
                  marginLeft: "15px"
                }}
              >
                Look for Items
              </Typography>
              {user ? 
              <>
              <Typography
              variant="p"
              noWrap
              component="a"
              onClick={() => navigate("/give")}
              sx={{
                fontFamily: "",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
                "&:hover": {
                  cursor: "pointer",
                },
                marginLeft: "15px"
              }}
            >
              Give Items
            </Typography>
            <Typography
            variant="p"
            noWrap
            component="a"
            onClick={() => navigate("/connections")}
            sx={{
              fontFamily: "",
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
              marginLeft: "15px"
            }}
          >
            Connections
          </Typography>
          </>
           : null }
              <Typography
                variant="p"
                noWrap
                component="a"
                onClick={() => navigate("/donate")}
                sx={{
                  fontFamily: "",
                  fontWeight: 500,
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    cursor: "pointer",
                  },
                  marginLeft: "15px"
                }}
              >
                Donation Info
              </Typography>
            </Box>
          
            
            {/* USER MENU AND ITEMS */}
            <Box sx={{ display: "flex", alignItems:"center" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={"user here"} src={"user image"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting, index) => (
                  <div key={setting}>
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenuClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                    {index < settings.length - 1 && <Divider />}
                  </div>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
