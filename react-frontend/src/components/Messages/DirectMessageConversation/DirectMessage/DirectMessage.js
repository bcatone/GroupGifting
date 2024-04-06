import React, { useRef } from "react";
import useHovering from "../../../../hooks/useHoverering";
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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import useConfirmationDialog from "../../../../hooks/useConfirmationDialog";
import ConfirmationDialog from "../../../common/ConfirmationDialog/ConfirmationDialog";

function Message({ id, type, sender, avatar, datetime, content, onDelete }) {
  const { isHovered, handleMouseEnter, handleMouseLeave} = useHovering();
  const { 
    isConfirmationDialogOpen,
    handleConfirmatonDialogClick,
    handleConfirmatonDialogCancel,
    handleConfirmatonDialogConfirm
  } = useConfirmationDialog(() => onDelete(id));


  return (
    <Card>
      <CardActionArea
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
      <Grid container>
        <Grid item xs={10}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>
                    <Avatar
                      src={avatar || ""}
                      style={{
                        width: "62px",
                        height: "62px"
                        // border: "1px solid black",
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        style={{fontSize: "1.25em", fontWeight: "bold"}}
                      >
                        {type === "received" ? sender : "You"}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        component="div"
                      >
                        {datetime}
                      </Typography>
                      <Typography 
                        variant="body2"
                        style={{marginTop: "0.5em", fontSize: "1.5em", fontFamily: "Roboto"}}
                      >
                        {content}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          
        </Grid>
        <Grid item>
          {type === "sent" && isHovered && (
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleConfirmatonDialogClick}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}
        </Grid>
      </Grid>
      </CardActionArea>
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={handleConfirmatonDialogCancel}
        onConfirm={handleConfirmatonDialogConfirm}
        prompt={"Are you sure that you would like to delete this message?"}
        confirmButtonText={"Delete"}
      />
    </Card>
  );
}

export default Message;
