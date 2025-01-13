import React, { useState, useEffect, useRef, useContext } from "react";
import { AIContext } from "../context/AIContext";

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
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ChatBot = () => {
  const theme = useTheme();
  const { aiMessage} = useContext(AIContext);

  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const conversationsEndRef = useRef(null);

  const [text, setText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchInitialMessage = async () => {
    try {
	const initialPrompt = `give me full details of who you and your developer is. your response should start with ${aiMessage}`;
      const { data } = await axios.post("/api/v1/gemini/chatbot", {
        text: initialPrompt,
        history: "",
      });

      // Directly display the bot's response as the first message
      setConversations([{ prompt: "", response: data.reply }]);
	toast.success(`${aiMessage}`);
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

  fetchInitialMessage();
}, []);

  const scrollToBottom = () => {
    conversationsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    setLoading(true);
    try {
      const fullConversation = conversations
        .map((conv) => `User: ${conv.prompt}\nEbukAI: ${conv.response}`)
        .join("\n");

      const { data } = await axios.post("/api/v1/gemini/chatbot", {
        text,
        history: fullConversation,
      });

      const response = data.reply;
      setConversations((prev) => [...prev, { prompt: text, response }]);
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
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("copied to clipboard!");
  };

  return (
    <Box
      width={isNotMobile ? "50%" : "90%"}
      p={"1rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt || "#f4f4f4"}
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
    {conv.prompt && (
      <>
        <Typography variant="body1" fontWeight="bold" color="primary">
          You:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            mb: 1,
            wordBreak: "break-word",
          }}
        >
          {conv.prompt}
        </Typography>
      </>
    )}

    <Typography variant="body1" fontWeight="bold" color="secondary">
      EbukAI:
    </Typography>
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "8px",
        overflowX: "auto",
        wordBreak: "break-word",
      }}
    >
      <ReactMarkdown
        children={conv.response}
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] || "";

            return !inline ? (
              <Box
                sx={{
                  mb: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "5px",
                  backgroundColor: theme.palette.background.paper,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    backgroundColor: theme.palette.grey[200],
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    borderBottom: "1px solid",
                    borderColor: theme.palette.divider,
                  }}
                >
                  {language && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {language.toUpperCase()}
                    </Typography>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(children)}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box
                  component="pre"
                  sx={{
                    margin: 0,
                    padding: "10px",
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                    overflowX: "auto",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                  {...props}
                >
                  {children}
                </Box>
              </Box>
            ) : (
              <Box
                component="code"
                sx={{
                  backgroundColor: theme.palette.background.alt,
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                  display: "inline-block",
                  wordBreak: "break-word",
                  overflowX: "auto",
                }}
                {...props}
              >
                {children}
              </Box>
            );
          },
        }}
      />
    </Box>

    {index < conversations.length - 1 && <Divider sx={{ my: 2 }} />}
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
      placeholder="Ask anything! e.g. Who am I or my developer?"
      type="text"
      multiline
      required
      margin="normal"
      fullWidth
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.shiftKey) {
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
      disabled={loading}
      sx={{ color: "white", mt: 2 }}
    >
      {loading ? "Loading..." : "Chat"}
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
