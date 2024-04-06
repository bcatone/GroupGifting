import React from "react";
import useHovering from "../../../hooks/useHovering";
import {
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";


function ConversationPreview({ onClick, avatar, username, datetime, content, numUnread }) {
  const { handleMouseEnter, handleMouseLeave} = useHovering();

  return (
    <Card onClick={onClick}>
      <CardActionArea
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
      <Grid container>
        <Grid item xs={10}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>
                <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    badgeContent={numUnread}
                    color="error"
                  >
                    <Avatar
                      src={avatar || ""}
                      style={{
                        width: "62px",
                        height: "62px"
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
                        style={{fontSize: "1.25em", fontWeight: "bold"}}
                      >
                        {username}
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
      </Grid>
      </CardActionArea>
    </Card>
  );
}

export default ConversationPreview;