import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
// import "./DirectMessageInput.css"; // Import custom CSS file

const {
  EmojiBlot,
  ShortNameEmoji,
  ToolbarEmoji,
  TextAreaEmoji,
} = quillEmoji;

Quill.register(
  {
    "formats/emoji": EmojiBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-textarea": TextAreaEmoji,
  },
  true
);

export default class DirectMessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  modules = {
    toolbar: {
      container: [
        ["emoji", "link", "image"],
      ],
    },
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
  };

  formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "color",
    "background",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "clean",
    "emoji",
  ];

  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          modules={this.modules}
          formats={this.formats}
        />
      </div>
    );
  }
}