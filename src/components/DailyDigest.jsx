import React, { useState } from "react";
import MyCont from "../context/MyCont";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "../components/Digest.css";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useContext } from "react";
import SignUp from "./SignUp";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function DailyDigest() {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const { isOpen, setIsOpen } = useContext(MyCont);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleClick1 = () => {
    navigate("/");
  };
  React.useEffect(() => {
    const token = localStorage.getItem("key");
    if (token) {
      setAuthenticated(true);
    }
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (localStorage.getItem("key")) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged Out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("key");
      localStorage.removeItem("id");
      localStorage.removeItem("Email Id");
      localStorage.removeItem("Name");
      navigate("/")
      setAuthenticated(false);
      console.log("signed Out");
    } else {
      navigate("/login");
    }
    // console.log(isSignUp);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleProfile = () =>{
    const store= localStorage.getItem("id");
    navigate(`/MyBlogs?id=${store}`);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      {/* NavBar */}
      <div className="navBar">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "2.2rem",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                onClick={handleClick1}
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjbeuEq-eIu5ZnR6-S328Tvh1zWEPFcZTBUw&s"
                    sx={{ width: 55, height: 55 }}
                  />
                </IconButton>
                Bloggerss...
              </Typography>

              <Box sx={{ flexGrow: 0 }}>
                {
                  /* <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.vectorstock.com/i/500p/40/53/passport-photo-of-young-handsome-man-close-up-vector-21284053.jpg"
                    sx={{ width: 55, height: 55 }}
                  /> */
                  <>
                    <div className="icon">
                      {/* <PersonOutlineIcon/> */}
                      <NotificationsIcon className="notificationIcon" />
                      <AccountCircle onClick={handleProfile} className="profileIcon" />
                      <Button
                        onClick={(e) => handleClick(e)}
                        variant="outlined"
                      >
                        {isAuthenticated ? "Sign Out" : "Sign In"}
                      </Button>
                    </div>
                  </>
                  /* </IconButton> */
                }
                {/* </Tooltip> */}

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
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
}
