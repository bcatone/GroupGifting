import React from "react";
import { useLocation } from "react-router-dom";
import useDirectMessageConversation from "./useDirectMessageConversation";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Message from "./Message/Message";


function DirectMessageConversation() {
  const location = useLocation();
  const { 
    messagesEndRef,
    isLoading,
    messages,
    formData,
    handleInputChange,
    handleDirectMessageSubmit,
    handleDirectMessageViewed,
    handleDirectMessageDelete
  } = useDirectMessageConversation(location.state.user_id);

  if (isLoading || messages.length === 0) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" spacing={3}>
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        {`Conversation with ${location.state.username || "User"}`}
      </Typography>
      {messages.map((message) => (
        <Message
          key={message.id}
          avatar={message.sender.avatar}
          direction={message.direction}
          sender={message.sender.username}
          datetime={message.created_at}
          content={message.content}
          onIsViewed={() => handleDirectMessageViewed(message.id)}
          onDelete={() => handleDirectMessageDelete(message.id)}
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
      <div ref={messagesEndRef} /> {/* Anchor */}
    </Container>
  );
}

export default DirectMessageConversation;