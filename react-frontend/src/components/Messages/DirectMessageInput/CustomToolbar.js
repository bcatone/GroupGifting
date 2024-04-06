import React from "react";
import { IconButton } from "@mui/material";
import {
  InsertEmoticon as EmojiIcon,
  Link as LinkIcon,
  AttachFile as FileIcon,
} from "@mui/icons-material";

const CustomToolbar = ({ onEmojiButtonClick }) => {
  return (
    <div className="custom-toolbar">
      <IconButton onClick={onEmojiButtonClick}>
        <EmojiIcon />
      </IconButton>
      <IconButton>
        <LinkIcon />
      </IconButton>
      <IconButton>
        <FileIcon />
      </IconButton>
    </div>
  );
};

export default CustomToolbar;