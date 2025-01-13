// component/Navbar.jsx
import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Call logout from context
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleHome = () => navigate("/");

  return (
    <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center"
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography
        style={{ cursor: "pointer" }}
        onClick={handleHome}
        variant="h1"
        color="primary"
        fontWeight="bold"
      >
        EbukAI
      </Typography>
      <Box mt={1}>
        {isLoggedIn ? (
          <>
            <NavLink to="/" style={{ textDecoration: "none", marginRight: "1rem" }}>
              Home
            </NavLink>
            <NavLink
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              style={{ textDecoration: "none", marginRight: "1rem" }}
            >
              Sign Up
            </NavLink>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              Sign In
            </NavLink>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
