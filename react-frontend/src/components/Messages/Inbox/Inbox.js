import React, { useEffect } from "react";
// import useInbox from "./useInbox";
import ConversationPreview from "./ConversationPreview";
import { fetchDirectMessageInbox } from "../../../redux/slices/directMessageSlice";
import { useDispatch, useSelector } from "react-redux";


function Inbox() {
  // const { conversations, handleConversationSelect } = useInbox();
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.directMessages.inbox);

  useEffect(() => {
    dispatch(fetchDirectMessageInbox());
  }, []);

  return (
    <div>
      {conversations.map((conversation, index) => (
        <ConversationPreview
          key={index}
          // onClick={() => handleConversationSelect(conversation)}
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