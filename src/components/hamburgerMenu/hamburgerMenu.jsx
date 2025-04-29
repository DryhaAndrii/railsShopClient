"use client";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';
import "./hamburgerMenu.scss";

export default function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="hamburger-button-wrapper">
        <IconButton onClick={toggleMenu} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </div>

      {createPortal(
        <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
          <div ref={menuRef} className="hamburger-menu__content">
            <Button endIcon={<CloseIcon />} onClick={toggleMenu} variant="outlined">
              Close
            </Button>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
