import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

function ConversationPreview({
  avatar,
  username,
  datetime,
  content,
  numUnread,
}) {

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Badge
                  badgeContent={numUnread}
                  color="primary"
                  overlap="circular"
                >
                  <Avatar
                    alt={username}
                    src={avatar}
                    style={{
                      width: "62px",
                      height: "62px",
                      border: "1px solid black",
                    }}
                  />
                </Badge>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {username}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      {datetime}
                    </Typography>
                    <Typography variant="body2">{content}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default ConversationPreview;
