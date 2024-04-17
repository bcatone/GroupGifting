import React, { useRef, useState } from "react";
import useControlledForm from "../../../hooks/useControlledForm";

const useMessageInput = (onSubmit, initialContent = "") => {
  const [message, setMessage] = useState(initialContent || "");
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const handleEmojiButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleEmojiSelect = (emojiData) => {
    const { emoji } = emojiData;
    const input = inputRef.current;

    // Get the current selection range within the input field
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    // Construct the new message with the selected emoji inserted at the cursor position
    const newMessage =
      message.slice(0, selectionStart) + emoji + message.slice(selectionEnd);

    // Update the message state with the new message
    setMessage(newMessage);

    // Move the cursor to the end of the inserted emoji
    const newCursorPosition = selectionStart + emoji.length;
    input.selectionStart = newCursorPosition;
    input.selectionEnd = newCursorPosition;
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl(null);
  };

  const handleMessageInputChange = (e) => {
    // handleInputChange(e);
    setMessage(e.target.value);
  };

  const handleClearMessage = () => {
    setMessage("");
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, message);
    handleClearMessage();
  };

  return {
    message,
    anchorEl,
    inputRef,
    handleEmojiButtonClick,
    handleEmojiSelect,
    handleCloseEmojiPicker,
    handleMessageInputChange,
    handleClearMessage,
    handleMessageSubmit,
  };
};

export default useMessageInput;
