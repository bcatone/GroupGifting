import "./MessageBar.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedConversation, fetchDirectMessageInbox } from "../../redux/slices/directMessageSlice";
import {
  Message as MessageIcon,
  ExpandMore as CondenseIcon,
  ExpandLess as ExpandIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import useToggle from "../../hooks/useToggle";
import {
  Badge,
  Card,
  CardActionArea,
  CardActions,
  Paper,
  Typography,
} from "@mui/material";
import MessageInbox from "../MessageInbox/MessageInbox";
import MessageList from "../MessageList/MessageList";
import useMessaging from "../../hooks/useMessaging";
import MessageInput from "../MessageInput/MessageInput";

function MessageBar() {
  const dispatch = useDispatch();
  const { handleMessageSubmit, handleMessageDelete, handleMessageEdit } = useMessaging();
  const totalNumUnread = useSelector((state) => state.directMessages.totalNumUnread);
  const selectedConversation = useSelector(
    (state) => state.directMessages.selectedConversation
  );
  const { isSelected: isOpen, toggleIsSelected: toggleIsOpen } = useToggle();

  useEffect(() => {
    dispatch(fetchDirectMessageInbox());
  }, []);

  return (
    <Card
      sx={{
        minWidth: "20rem",
        position: "fixed",
        bottom: "0",
        right: "0",
        zIndex: "1000",
        background: "#85B1EA"
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardActions onClick={toggleIsOpen}>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={totalNumUnread}
            color="error"
          >
            <MessageIcon />
          </Badge>
          <Typography>Messaging</Typography>
          {isOpen ? <CondenseIcon /> : <ExpandIcon />}
        </CardActions>
      </CardActionArea>

      {isOpen && selectedConversation && (
        <CardActionArea>
          <CardActions onClick={() => dispatch(clearSelectedConversation())}>
            <BackIcon />
            <Typography>Back to Inbox</Typography>
          </CardActions>
        </CardActionArea>
      )}

      {isOpen && (
        <div>
          <Paper>
            {selectedConversation ? (
              <>
                <div className="message-bar__editable-list">
                  <MessageList
                    onMessageItemEdit={handleMessageEdit}
                    onMessageItemDelete={handleMessageDelete}
                  />
                </div>
                <div className="message-bar__input-form">
                  <MessageInput onSubmit={handleMessageSubmit} />
                </div>
              </>
            ) : (
              <div className="message-bar__list">
                <MessageInbox />
              </div>
            )}
          </Paper>
        </div>
      )}
    </Card>

  );
}

export default MessageBar;
