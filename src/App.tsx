import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import SendIcon from "@mui/icons-material/Send";
import { motion, AnimatePresence } from "framer-motion";
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import { useInputDocUrl } from "./functions/lambda";
import CustomDropdown from "./components/Dropdown";
import { Input } from "@mui/joy";

Amplify.configure(awsconfig);
// Work-arounds to use material UI content:

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [link, setLink] = useState("");
  const [messages, setMessages] = useState<
    Array<{ author: "user" | "bot"; content: string }>
  >([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isLoading, data } = useInputDocUrl(link, "GET", {
    enabled: shouldFetch,
  });

  useEffect(() => {
    setLink("");
    setShouldFetch(false);
  }, [isModalOpen]);

  const handleSendClick = () => {
    // Handle the submission of the prompt here
    const newUserMessage: { author: "user" | "bot"; content: string } = {
      author: "user",
      content: prompt,
    };
    const newBotReply: { author: "user" | "bot"; content: string } = {
      author: "bot",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi autem omnis itaque ex aspernatur quasi expedita ad quos. Est illo maiores atque esse ratione praesentium ullam modi? Temporibus, dolores quod.",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newUserMessage,
      newBotReply,
    ]);

    // Optionally, clear the prompt after submission
    setPrompt("");
  };
  const handleSubmit = async () => {
    setShouldFetch(true);
    // Call your API with the link here. This is just a placeholder.
    // You should replace this with your actual API call logic.
  };

  return (
    // <CssVarsProvider>
    <div style={{ backgroundColor: "#2b2b2b", minHeight: "100vh" }}>
      {" "}
      {/* Dark background for the entire app */}
      <div
        style={{
          backgroundColor: "#1E1E1E",
          padding: "1rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        {/* Dark header */}
        {/* Title on the left */}
        <h1
          style={{
            color: "white",
            margin: "0vh 0vw 0vh 3vw",
            textAlign: "left",
          }}
        >
          DocGPT
        </h1>
        {/* Nested Grid for Button and Drop-Down*/}
        <Grid
          container
          spacing={2}
          sx={{
            margin: "0 2vw",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "nowrap",
          }}
        >
          {/* Drop-Down */}
          <Grid xs={6}>
            <CustomDropdown prompt={prompt} />
          </Grid>
          {/* Button */}
          <Grid xs={6} style={{ textAlign: "right" }}>
            <Button
              variant="solid"
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              Learn documentation
            </Button>{" "}
            {/* Button on the right */}
          </Grid>
        </Grid>
      </div>
      {/* New Doc Modal */}
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <h2>Add new documentation</h2>
          <Input
            placeholder="Enter doc link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            sx={{
              "&::before": {
                border: "1.5px solid var(--Input-focusedHighlight)",
                transform: "scaleX(0)",
                left: "2.5px",
                right: "2.5px",
                bottom: 0,
                top: "unset",
                transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                borderRadius: 0,
                borderBottomLeftRadius: "64px 20px",
                borderBottomRightRadius: "64px 20px",
              },
              "&:focus-within::before": {
                transform: "scaleX(1)",
              },
            }}
          />

          <Button variant="solid" color="neutral" onClick={handleSubmit}>
            Submit Link
          </Button>
          <p>{isLoading ? "loading" : data}</p>
        </ModalDialog>
      </Modal>
      {/* Rest of the app content */}
      <div>
        <div
          style={{
            margin: "1rem 0vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Start of stack holding prompt and dialogue */}
          <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
            {/* Grid holding Input and Submit Icon/Button */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ maxWidth: "800px", width: "80%", margin: "auto" }}
            >
              <Grid xs={12}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#4c4c4c", // The same color as the text box's background
                    borderRadius: "4px", // To match the Input component's border radius
                    overflow: "hidden", // To keep child elements within the rounded corner boundary
                  }}
                >
                  <Textarea
                    placeholder="Enter your prompt here…"
                    minRows={1}
                    maxRows={10} // Maximum number of rows before scrolling
                    variant="outlined" // Using the outlined variant for styling
                    sx={{
                      // direction: 'ltr',
                      width: "100%",
                      "&::before": {
                        display: "none",
                      },
                      "&:focus-within": {
                        outline: "0px solid var(--Textarea-focusedHighlight)",
                      },
                      // Styling the scrollbar
                      "&::-webkit-scrollbar": {
                        width: "5px", // Set the width of the scrollbar
                      },
                      "&::-webkit-scrollbar-track": {
                        boxShadow: "inset 0 0 5px grey",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      color: "#9c9c9c",
                      overflowY: "auto", // Allow vertical scrolling when content exceeds the max rows
                      padding: "1vh 1vw 1vh 1vw",
                      outline: "none",
                    }}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />

                  <Button
                    onClick={handleSendClick}
                    startDecorator={<SendIcon />}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      padding: 0, // Set padding to zero
                      margin: "auto 0vw 0.3vh 0vw", // Set margin to zero
                    }}
                  ></Button>
                </div>
              </Grid>
            </Grid>
            {/* Map the conversation */}
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  backgroundColor:
                    message.author === "user" ? "#3c3c3c" : "#2b2b2b",
                  padding: "1rem",
                  borderRadius: "4px",
                  marginTop: "1rem",
                  color: message.author === "user" ? "#c3c3c3" : "#e1e1e1",
                  wordWrap: "break-word", // Add this
                  overflowWrap: "break-word", // Add this
                  maxWidth: "100%", // Add this (or adjust as needed)
                }}
              >
                <div
                  style={{
                    width: "80%",
                    margin: "auto",
                    padding: "1vh 0vw 1vh 0vw",
                  }}
                >
                  {message.author === "bot" ? (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <TypingEffect message={message.content} />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
          </Stack>
          {/* 4c4c4c */}
        </div>
      </div>
    </div>
    // </CssVarsProvider>
  );
}

const TypingEffect = ({ message }: { message: string }) => {
  const [visibleMessage, setVisibleMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (index < message.length) {
      const randomDelay = Math.floor(Math.random() * (120 - 30 + 1) + 30); // Generate random delay between 30ms to 120ms

      const timeoutId = setTimeout(() => {
        setVisibleMessage((prevMessage) => prevMessage + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, randomDelay);

      return () => clearTimeout(timeoutId);
    } else {
      setIsTyping(false); // Set isTyping to false once the message is fully typed
    }
  }, [message, index]);

  return (
    <>
      {visibleMessage}
      {isTyping && <span className="blinking-cursor">|</span>}
    </>
  );
};

export default App;
