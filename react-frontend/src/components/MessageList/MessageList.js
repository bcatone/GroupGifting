import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "../MessageItem/MessageItem";

function MessageList({ onMessageItemEdit, onMessageItemDelete }) {
  const selectedConversation = useSelector(
    (state) => state.directMessages.selectedConversation
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };
    scrollToBottom();
  }, []);

  return (
    <>
      {selectedConversation.length > 0 && (
        selectedConversation.map((message) => (
          <MessageItem
            key={message.id}
            id={message.id}
            avatar={message.avatar_url || ""}
            direction={message.direction}
            sender={message.username || "User"}
            datetime={message.created_at}
            content={message.content}
            isViewed={message.is_viewed}
            onEdit={onMessageItemEdit}
            onDelete={() => onMessageItemDelete(message.id)}
          />
        ))
      )}
      <div ref={messagesEndRef}/>
    </>
  );
}

export default MessageList;
