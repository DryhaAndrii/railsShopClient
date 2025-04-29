import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./header.scss";
import HamburgerMenu from "../hamburgerMenu/hamburgerMenu";
import HeaderLinks from "./headerLinks";

export default function Header() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (location.pathname === "/auth") return null;

  return (
    <AppBar position="static">
      <Toolbar className="header">
        <Typography variant="h6" component={Link} to="/" className="logo-link">
          Shop
        </Typography>

        <Box className="nav-links">
          <HamburgerMenu>
            <Button endIcon={<LogoutIcon />} onClick={handleLogout} variant="contained">
              Logout
            </Button>
            <HeaderLinks user={user} />
          </HamburgerMenu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
