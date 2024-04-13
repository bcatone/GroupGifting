import React from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Message } from "@mui/icons-material";
import useDirectMessage from "./useDirectMessage";
import MessageInput from "../../MessageInput/MessageInput";
import useConfirmationDialog from "../../../../hooks/useConfirmationDialog";
import ConfirmationDialog from "../../../common/ConfirmationDialog/ConfirmationDialog";

function DirectMessage({
  id,
  isViewed,
  direction,
  sender,
  avatar,
  datetime,
  content,
  onEdit,
  onDelete,
  onViewed,
}) {
  const {
    targetRef,
    isHovered,
    isEditingMessage,
    toggleIsEdititingMessage,
    handleMouseEnter,
    handleMouseLeave,
    handleMessageSubmit
  } = useDirectMessage(id, isViewed, onViewed, onEdit);

  const {
    isConfirmationDialogOpen,
    handleConfirmatonDialogClick,
    handleConfirmatonDialogCancel,
    handleConfirmatonDialogConfirm,
  } = useConfirmationDialog(onDelete);

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={targetRef}
      style={{ borderBottom: "1px solid #474554" }}
    >
      <Grid container>
        <Grid item>
          <CardContent>
            <Avatar
              src={avatar || ""}
              style={{
                width: "3em",
                height: "3em",
              }}
            />
          </CardContent>
        </Grid>
        <Grid item style={{ minWidth: "70%" }}>
          <CardContent>
            <Grid item container spacing={2} style={{ alignItems: "center" }}>
              <Grid item xs style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{
                    fontSize: "1.1em",
                    fontWeight: "bold",
                    marginRight: "1em",
                  }}
                >
                  {direction === "received" ? sender : "You"}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {datetime}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              { isEditingMessage ? (
                <MessageInput 
                  initialContent={content} 
                  onSubmit={handleMessageSubmit}
                />
              ) : (
                <Typography variant="body1">{content}</Typography>
              )}
              
            </Grid>
          </CardContent>
        </Grid>
        <Grid item>
          {direction === "sent" && isHovered && (
            <CardActions
              sx={{ justifyContent: "flex-end", alignItems: "flex-start" }}
            >
              <IconButton>
                <EditIcon onClick={toggleIsEdititingMessage} />
              </IconButton>
              <IconButton onClick={handleConfirmatonDialogClick}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}
        </Grid>
      </Grid>
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={handleConfirmatonDialogCancel}
        onConfirm={() => handleConfirmatonDialogConfirm(onDelete)}
        prompt={"Are you sure that you would like to delete this message?"}
        confirmButtonText={"Delete"}
      />
    </Card>
    // <Card
    //   sx
    //   onMouseEnter={handleMouseEnter}
    //   onMouseLeave={handleMouseLeave}
    //   ref={targetRef}
    //   // style={{background: `${direction === "sent" ? "#f0fbff" : "#f4fcff"}`}}
    // >
    //     <Grid container>
    //       <Grid item xs={10}>
    //         <CardContent>
    //           <Grid container spacing={2}>
    //             <Grid item>
    //               <Avatar
    //                 src={avatar || ""}
    //                 style={{
    //                   width: "32px",
    //                   height: "32px",
    //                 }}
    //               />
    //             </Grid>
    //             <Grid
    //               item xs={12}
    //               sm
    //               container
    //             >
    //               <Grid
    //                 item
    //                 xs
    //                 container
    //                 direction="row"
    //                 spacing={2}
    //               >
    //                 <Grid item xs>
    //                   <Typography
    //                     // gutterBottom
    //                     // variant="subtitle1"
    //                     // component="div"
    //                     style={{ fontSize: "1.25em", fontWeight: "bold" }}
    //                   >
    //                     {direction === "received" ? sender : "You"}
    //                   </Typography>
    //                   <Typography
    //                     // variant="subtitle2"
    //                     // component="div"
    //                   >
    //                     {datetime}
    //                   </Typography>
    //                   <Typography
    //                     variant="body1"
    //                     // style={{
    //                     //   marginTop: "0.5em",
    //                     //   fontSize: "1.5em",
    //                     //   fontFamily: "Roboto",
    //                     // }}
    //                   >
    //                     {content}
    //                   </Typography>
    //                 </Grid>
    //               </Grid>
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </Grid>
    //       <Grid item>
    //         {direction === "sent" && isHovered && (
    //           <CardActions sx={{ justifyContent: "flex-end" }}>
    //             <IconButton>
    //               <EditIcon />
    //             </IconButton>
    //             <IconButton onClick={handleConfirmatonDialogClick}>
    //               <DeleteIcon />
    //             </IconButton>
    //           </CardActions>
    //         )}
    //       </Grid>
    //     </Grid>
    //   <ConfirmationDialog
    //     open={isConfirmationDialogOpen}
    //     onClose={handleConfirmatonDialogCancel}
    //     onConfirm={() => handleConfirmatonDialogConfirm(onDelete)}
    //     prompt={"Are you sure that you would like to delete this message?"}
    //     confirmButtonText={"Delete"}
    //   />
    // </Card>
  );
}

export default DirectMessage;
