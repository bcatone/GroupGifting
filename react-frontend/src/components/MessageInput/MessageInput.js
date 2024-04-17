import "./MessageInput.css";
import React from "react";
import {
  Box,
  Grid,
  IconButton,
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
import {
  MAX_CONTENT_CHARS,
  MAX_TEXTFIELD_ROWS,
} from "../../helpers/messageConstants";

const MessageInput = ({ onSubmit, initialContent = "", recipient = null }) => {
  const {
    messageInput,
    emojiPickerAnchorEl,
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
              required
              inputRef={inputRef}
              value={messageInput}
              onChange={handleMessageInputChange}
              multiline
              maxRows={MAX_TEXTFIELD_ROWS}
              inputProps={{ maxLength: MAX_CONTENT_CHARS }}
              fullWidth
              variant="outlined"
              placeholder={`${
                recipient
                  ? `Message ${recipient}`
                  : "Enter your message here..."
              }`}
            />
            <Popover
              open={Boolean(emojiPickerAnchorEl)}
              anchorEl={emojiPickerAnchorEl}
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
        <Box
          component="div"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div className="message-input">
            <div className="message-input__emoji-button">
              <EmojiIcon onClick={handleEmojiButtonClick} />
            </div>
            <div className="message-input__cancel-button">
              <CloseIcon onClick={handleClearMessage} />
            </div>
            <div className="message-input__send-button">
              <SendIcon onClick={handleMessageSubmit} />
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default MessageInput;
