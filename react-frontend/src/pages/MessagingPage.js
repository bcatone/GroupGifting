import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedConversation } from "../redux/slices/directMessageSlice";
import { Typography } from "@mui/material";
import useMessaging from "../hooks/useMessaging";
import MessageInbox from "../components/MessageInbox/MessageInbox";
import MessageList from "../components/MessageList/MessageList";
import MessageInput from "../components/MessageInput/MessageInput";

// placeholder messaging page; will be updated
function MessagingPage() {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.directMessages.selectedConversation
  );
  const { handleMessageSubmit, handleMessageDelete, handleMessageEdit } =
    useMessaging();

  return (
    <>
      <div>
        <Typography variant="h4">Messages</Typography>
      </div>
      <div>
        {selectedConversation && (
          <div onClick={() => dispatch(clearSelectedConversation())}>
            <Typography>Back to Inbox</Typography>
          </div>
        )}
      </div>
      <div style={{ maxHeight: "70vh", overflow: "scroll" }}>
        {(selectedConversation && (
          <>
            <MessageList
              onMessageItemEdit={handleMessageEdit}
              onMessageItemDelete={handleMessageDelete}
            />
            <MessageInput onSubmit={handleMessageSubmit} />
          </>
        )) || <MessageInbox />}
      </div>
    </>
  );
}

export default MessagingPage;
