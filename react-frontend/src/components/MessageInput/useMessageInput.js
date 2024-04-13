import { useRef, useState } from "react";

const useMessageInput = (onSubmit, initialContent = "") => {
  const [messageInput, setMessageInput] = useState(initialContent || "");
  const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const handleEmojiButtonClick = (e) => {
    setEmojiPickerAnchorEl(e.currentTarget);
  };

  const handleEmojiSelect = (emojiData) => {
    const { emoji } = emojiData;
    const input = inputRef.current;

    // Get the current selection range within the input field
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    // Construct the new message with the selected emoji inserted at the cursor position
    const newMessage =
      messageInput.slice(0, selectionStart) + emoji + messageInput.slice(selectionEnd);

    // Update the message state with the new message
    setMessageInput(newMessage);

    // Move the cursor to the end of the inserted emoji
    const newCursorPosition = selectionStart + emoji.length;
    input.selectionStart = newCursorPosition;
    input.selectionEnd = newCursorPosition;
  };

  const handleCloseEmojiPicker = () => {
    setEmojiPickerAnchorEl(null);
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleClearMessage = () => {
    setMessageInput("");
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, messageInput);
    handleClearMessage();
  };

  return {
    messageInput,
    emojiPickerAnchorEl,
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