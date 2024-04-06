import React, { useState, useRef } from "react";
import { IconButton, InputAdornment, TextField, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { InsertEmoticon as EmojiIcon, AttachFile as FileIcon, Link as LinkIcon } from "@mui/icons-material";
import Picker from 'emoji-picker-react';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const inputRef = useRef(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleLinkInsertion = () => {
    setMessage(prevMessage => `${prevMessage} [${linkUrl}]`);
    setLinkDialogOpen(false);
    setLinkUrl("");
  };

  const handleEmojiSelect = (emojiData) => {
    const { emoji } = emojiData;
    const input = inputRef.current;
  
    // Get the current selection range within the input field
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
  
    // Construct the new message with the selected emoji inserted at the cursor position
    const newMessage =
      message.slice(0, selectionStart) +
      emoji +
      message.slice(selectionEnd);
  
    // Update the message state with the new message
    setMessage(newMessage);
  
    // Move the cursor to the end of the inserted emoji
    const newCursorPosition = selectionStart + emoji.length;
    input.selectionStart = newCursorPosition;
    input.selectionEnd = newCursorPosition;
  };

  return (
    <div>
      <TextField
  inputRef={inputRef}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  fullWidth
  multiline
  variant="outlined"
  placeholder="Type your message..."
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowEmojiPicker(true)}>
          <EmojiIcon />
        </IconButton>
        <IconButton>
          <label htmlFor="file-upload">
            <FileIcon />
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </IconButton>
        <IconButton onClick={() => setLinkDialogOpen(true)}>
          <LinkIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
      {showEmojiPicker && (
        <Picker onEmojiClick={handleEmojiSelect} />
      )}
      <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
        <DialogContent>
          <TextField
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            fullWidth
            variant="outlined"
            label="Enter URL"
            placeholder="https://example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLinkInsertion}>Insert Link</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MessageInput;