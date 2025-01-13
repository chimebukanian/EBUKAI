import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "../utils/axios";
import { AIContext } from "../context/AIContext";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const { setAiMessage } = useContext(AIContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { success, message, accessToken, aiMessage } = data;
      if (success && accessToken) {
        toast.success(message);
        localStorage.setItem("accessToken", accessToken);
        setAiMessage(aiMessage); // Save the AI welcome message
        setTimeout(() => navigate("/chatbot"), 1000);
      } else {
        toast.error(message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
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
          Sign In
        </Typography>

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
          Sign In
        </Button>
        <Typography mt={2}>
          Don’t have an account? <Link to="/register">Please Register</Link>
        </Typography>
      </form>
      <Toaster />
    </Box>
  );
};

export default Login;
