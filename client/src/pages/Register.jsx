import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from '../utils/axios';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        username,
        email,
        password,
      });

      const { success, message } = data;
      if (success) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          required
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Sign Up
        </Button>
        <Typography mt={2}>
          Already have an account? <Link to="/login">Please Login</Link>
        </Typography>
      </form>

    </Box>
  );
};

export default Register;
