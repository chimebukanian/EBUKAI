import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check logged-in status from localStorage
  const checkLoginStatus = () => {
    setIsLoggedIn(Boolean(localStorage.getItem("accessToken")));
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout"); // API call for logout
      localStorage.removeItem("accessToken"); // Remove token from localStorage
      setIsLoggedIn(false); // Update state
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Navigate to home
  const handleHome = () => navigate("/");

  useEffect(() => {
    checkLoginStatus(); // Update login status on component mount
  }, []);

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
