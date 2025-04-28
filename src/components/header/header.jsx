import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import "./header.scss";

export default function Header() {

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <AppBar>
      <Toolbar className="header">
        <Typography variant="h6">Shop</Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
