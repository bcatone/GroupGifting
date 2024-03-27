import React, { useEffect, useRef } from "react";
import useHovering from "../../../../hooks/useHovering";
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
import useConfirmationDialog from "../../../common/ConfirmationDialog/useConfirmationDialog";
import ConfirmationDialog from "../../../common/ConfirmationDialog/ConfirmationDialog";
;

function Message({ avatar, direction, sender, datetime, content, onIsViewed, onDelete }) {
  const { isHovered, handleMouseEnter, handleMouseLeave} = useHovering();
  const targetRef = useRef(null);
  const { 
    isConfirmationDialogOpen,
    handleConfirmatonDialogClick,
    handleConfirmatonDialogCancel,
    handleConfirmatonDialogConfirm
  } = useConfirmationDialog();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIsViewed();
          observer.unobserve(targetRef.current);
        }
      });
    }, { threshold: 0.5 });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Card>
      <CardActionArea
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={targetRef}
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
                        style={{ fontSize: "1.25em", fontWeight: "bold" }}
                      >
                        {direction === "received" ? sender : "You"}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        component="div"
                      >
                        {datetime}
                      </Typography>
                      <Typography 
                        variant="body2"
                        style={{ marginTop: "0.5em", fontSize: "1.5em", fontFamily: "Roboto" }}
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
            {direction === "sent" && isHovered && (
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
        onConfirm={() => handleConfirmatonDialogConfirm(onDelete)}
        prompt={"Are you sure that you would like to delete this message?"}
        confirmButtonText={"Delete"}
      />
    </Card>
  );
}

export default Message;