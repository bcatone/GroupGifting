import "./MessageInbox.css";
import React from "react";
import {
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

function MessageInboxItem({
  onClick,
  avatar,
  username,
  datetime,
  content,
  numUnread,
}) {
  

  return (
    <div onClick={onClick} className="message-inbox__item">
      <CardActionArea>
        <Grid container>
          <Grid item xs={10}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    badgeContent={numUnread || 0}
                    color="error"
                  >
                    <Avatar
                      src={avatar || ""}
                    />
                  </Badge>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        component="div"
                        style={{ fontWeight: "bold" }}
                      >
                        {username}
                      </Typography>
                      <Typography variant="subtitle2" component="div">
                        {`Last updated: ${datetime}`}
                      </Typography>
                      <Typography
                        variant="body2"
                      >
                        {content}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </div>
  );
}

export default MessageInboxItem;
