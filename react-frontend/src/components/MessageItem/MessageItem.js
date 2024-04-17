import "./MessageItem.css";
import React from "react";
import {
  Avatar,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Menu,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreIcon,
} from "@mui/icons-material";
import useMessageItem from "./useMessageItem";
import ConfirmationDialog from "../common/ConfirmationDialog/ConfirmationDialog";
import MessageInput from "../MessageInput/MessageInput";

function MessageItem({
  id,
  direction,
  sender,
  avatar,
  datetime,
  content,
  isViewed,
  onEdit,
  onDelete,
}) {
  const {
    targetRef,
    isEditMode,
    handleEnterMessageEditMode,
    handleExitMessageEditMode,
    messageMenuAnchorEl,
    isHovered,
    setIsHovered,
    handleMenuOpen,
    handleMenuClose,
    isDeleteMessageDialogOpen,
    handleDeleteMessageDialogClick,
    handleDeleteMessageDialogCancel,
    handleDeleteMessageDialogConfirm,
    isCancelEditMessageDialogOpen,
    handleCancelEditMessageDialogClick,
    handleCancelEditMessageDialogCancel,
    handleMessageUpdate,
  } = useMessageItem(id, isViewed, onDelete, onEdit);

  if (isEditMode) {
    return (
      <div>
        <CardActionArea>
          <CardActions onClick={handleCancelEditMessageDialogClick}>
            Cancel changes
          </CardActions>
        </CardActionArea>
        <MessageInput onSubmit={handleMessageUpdate} initialContent={content} />
        <ConfirmationDialog
          open={isCancelEditMessageDialogOpen}
          onClose={handleCancelEditMessageDialogCancel}
          onConfirm={handleExitMessageEditMode}
          prompt={"Cancel all changes to this message?"}
          confirmButtonText={"Discard Changes"}
        />
      </div>
    );
  }

  return (
    <div
      className={`message-item ${isViewed ? "" : "message-item__unread"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={targetRef}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar src={avatar || ""} />
          </Grid>
          <Grid item>
            <Grid item container spacing={1}>
              <Grid item>
                <Typography style={{ fontWeight: "bold" }}>
                  {direction === "received" ? sender : "You"}
                </Typography>
              </Grid>
              <Grid item style={{ textAlign: "flex-end" }}>
                <Typography>{datetime}</Typography>
              </Grid>
              {direction === "sent" && isHovered && (
                <Grid item>
                  <MoreIcon onClick={handleMenuOpen} />
                  <Menu
                    open={Boolean(messageMenuAnchorEl)}
                    anchorEl={messageMenuAnchorEl}
                    onClose={handleMenuClose}
                  >
                    <CardActionArea>
                      <CardActions
                        onClick={() => handleEnterMessageEditMode(id)}
                      >
                        <EditIcon />
                        {"Edit Message"}
                      </CardActions>
                    </CardActionArea>
                    <CardActionArea>
                      <CardActions onClick={handleDeleteMessageDialogClick}>
                        <DeleteIcon />
                        {"Delete Message"}
                      </CardActions>
                    </CardActionArea>
                  </Menu>
                </Grid>
              )}
            </Grid>
            <Grid item>
              <Typography style={{ maxWidth: "250px" }}>{content}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <ConfirmationDialog
        open={isDeleteMessageDialogOpen}
        onClose={handleDeleteMessageDialogCancel}
        onConfirm={() => handleDeleteMessageDialogConfirm(onDelete)}
        prompt={"Are you sure that you would like to delete this message?"}
        confirmButtonText={"Delete"}
      />
    </div>
  );
}

export default MessageItem;
