import React from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import {
  Close as CloseIcon,
  InsertEmoticon as EmojiIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import useMessageInput from "./useMessageInput";
import Picker from "emoji-picker-react";

const MessageInput = ({ onSubmit, initialContent }) => {
  // console.log("onSubmit: ", onSubmit);
  const {
    message,
    anchorEl,
    inputRef,
    handleEmojiButtonClick,
    handleEmojiSelect,
    handleCloseEmojiPicker,
    handleMessageInputChange,
    handleClearMessage,
    handleMessageSubmit,
  } = useMessageInput(onSubmit, initialContent);

  return (
    <div>
      <Box component="form" onSubmit={handleMessageSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              inputRef={inputRef}
              value={message}
              onChange={handleMessageInputChange}
              style={{ background: "white" }}
              fullWidth
              multiline
              variant="outlined"
              placeholder="Type your message..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleEmojiButtonClick}>
                      <EmojiIcon />
                    </IconButton>
                    <IconButton onClick={handleClearMessage}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={handleMessageSubmit}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseEmojiPicker}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <IconButton onClick={handleCloseEmojiPicker}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Picker onEmojiClick={handleEmojiSelect} />
            </Popover>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MessageInput;
