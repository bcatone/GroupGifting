import React from "react";
import useInbox from "./useInbox";
import { Container, Typography } from "@mui/material";
import ConversationPreview from "./ConversationPreview";

function Inbox() {
  const { conversations, handleConversationSelect } = useInbox();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
        Inbox
      </Typography>
      {conversations.map((conversation, index) => (
        <div 
          key={index} 
          onClick={() => handleConversationSelect(conversation)}
        >
          <ConversationPreview
            key={index}
            id={conversation.user_id}
            username={conversation.username}
            avatar={conversation.avatar}
            datetime={conversation.last_updated}
            content={conversation.content_preview}
            numUnread={conversation.num_unread}
          />
        </div>
      ))}
    </Container>
  );
}

export default Inbox;
