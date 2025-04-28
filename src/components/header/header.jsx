import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";

import "./header.scss";

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
          {user?.role === "admin" && (
            <>
              <MuiLink
                component={Link}
                to="/items"
                color="inherit"
                underline="none"
                className="nav-link"
              >
                Items
              </MuiLink>
              <MuiLink
                component={Link}
                to="/users"
                color="inherit"
                underline="none"
                className="nav-link"
              >
                Users
              </MuiLink>
            </>
          )}
          <Button
            color="inherit"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
