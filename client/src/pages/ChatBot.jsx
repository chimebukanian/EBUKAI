import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "../utils/axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  Divider,
} from "@mui/material";

const ChatBot = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const conversationsEndRef = useRef(null);

  const [text, setText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");

  const scrollToBottom = () => {
    conversationsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const { data } = await axios.post("/api/v1/gemini/chatbot", { text });
      setConversations((prev) => [
        ...prev,
        { prompt: text, response: data },
      ]);
      setText("");
      toast.success("Response received!");
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.error || err.message || "An error occurred!";
      setError(errorMessage);
      toast.error(errorMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "50%" : "90%"}
      p={"1rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      {conversations.length > 0 && (
        <Card
          sx={{
            mt: 2,
            border: 1,
            boxShadow: 0,
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Box p={2}>
            {conversations.map((conv, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body1" fontWeight="bold" color="primary">
                  You:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-wrap", mb: 1 }}
                >
                  {conv.prompt}
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="secondary"
                >
                  EbukAI:
                </Typography>
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.alt,
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <ReactMarkdown
                    children={conv.response}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <Typography variant="h4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <Typography variant="h5" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <Typography variant="body1" {...props} />
                      ),
                      code: ({ node, inline, ...props }) => (
                        <Box
                          component="code"
                          sx={{
                            backgroundColor: theme.palette.background.alt,
                            padding: "2px 4px",
                            borderRadius: "4px",
                            fontSize: "0.875rem",
                            fontFamily: "monospace",
                          }}
                          {...props}
                        />
                      ),
                    }}
                  />
                </Box>

                {index < conversations.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </Box>
            ))}
            <div ref={conversationsEndRef} />
          </Box>
        </Card>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <Typography variant="h3" gutterBottom>
          Ask EbukAI Chatbot
        </Typography>

        <TextField
          placeholder="Ask anything. e.g., who is EbukAI?"
          type="text"
          multiline
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Chat
        </Button>
        <Typography mt={2}>
          Not this tool? <Link to="/">GO BACK</Link>
        </Typography>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </Box>
  );
};

export default ChatBot;
