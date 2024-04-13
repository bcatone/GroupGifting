import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectMessageConversation } from "../../redux/slices/directMessageSlice";
import MessageInboxItem from "./MessageInboxItem";

function MessageInbox () {
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.directMessages.inbox);

    // Move this to a custom hook if inbox logic grows
    const handleConversationSelect = (otherUserId) => {
        dispatch(fetchDirectMessageConversation(otherUserId));
    };

    if (!conversations) {
      return (
        <div>
          No messages to display.
        </div>
      )
    }
    
    return (
        conversations.map((conversation) => (
            <MessageInboxItem
              key={conversation.user_id}
              onClick={() =>
                handleConversationSelect(conversation.user_id)
              }
              avatar={conversation.avatar}
              username={conversation.username}
              datetime={conversation.last_updated}
              content={conversation.content_preview}
              numUnread={conversation.num_unread}
            />
          ))
    );
}

export default MessageInbox;