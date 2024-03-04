import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Message from "./DirectMessage/DirectMessage";
import useDirectMessageConversation from "./useDirectMessageConversation";
import MessageInput from "../MessageInput/MessageInput";

function DirectMessageConversation() {
  const location = useLocation();
  const messagesEndRef = useRef(null); // Create a ref for the end of messages

  const { 
    isLoading,
    messages,
    formData,
    handleInputChange,
    handleDirectMessageSubmit,
    handleDirectMessageDelete,
    sendMessage, 
    editMessage, 
    deleteMessage 
  } = useDirectMessageConversation(location.state.user_id);

  // Function to scroll to the bottom of the messages when they change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom on initial render
  }, [messages]);

  if (isLoading ) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" spacing={3}>
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        {`Conversation with ${location.state.username || "User"}`}
      </Typography>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          id={message.id}
          type={message.direction}
          sender={message.sender.username || ""}
          avatar={message.avatar}
          datetime={message.created_at}
          content={message.content}
          onDelete={handleDirectMessageDelete}
        />
      ))}
      <Box component="form" onSubmit={handleDirectMessageSubmit}>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              name="content"
              value={formData.content || ""}
              onChange={handleInputChange}
              label={`Message ${location.state.username}`}
              fullWidth
              multiline
            />
            {/* <MessageInput /> */}
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                mb: 2,
                marginLeft: 2,
                borderRadius: 4,
                color: "",
                fontWeight: "bold",
                width: "9em",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div ref={messagesEndRef} />
    </Container>
  );
}

export default DirectMessageConversation;