import React from "react";
import useInbox from "./useInbox";
import ConversationPreview from "./ConversationPreview";


function Inbox() {
  const { conversations, handleConversationSelect } = useInbox();

  return (
    <div>
      {conversations.map((conversation, index) => (
        <ConversationPreview
          key={index}
          onClick={() => handleConversationSelect(conversation)}
          avatar={conversation.avatar}
          username={conversation.username}
          datetime={conversation.last_updated}
          content={conversation.content_preview}
          numUnread={conversation.num_unread}
        />
      ))}
    </div>
  );
}

export default Inbox;