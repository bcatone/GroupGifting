import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchUserById } from "../redux/slices/userSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import default_avatar from "../../assets/images/defaultavatar.jpg"
import { Grid, Typography, Container, Box } from "@mui/material";
import CommonButton from "../../components/common/CommonButton";
import { fetchUserByUsername } from "../../redux/slices/userSlice";
import BigResultCard from "../../components/common/BigResultCard";

const UserAccount = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState("");
  const [user, setUser] = useState({});

  const loggedInUser = useSelector((state) => state.auth.user);

  console.log("loggedInUser", loggedInUser);

  console.log("params", params);


const itemsWithSoonestDeadlines = (items) => {
  return items
    ? items
        .filter((item) => item.status === "Available")
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3)
    : null;
};

const soonestDeadlineItems = itemsWithSoonestDeadlines(user.items);
console.log("Items with soonest deadlines:", soonestDeadlineItems);



  useEffect(() => {
    // if user in params same as loggedInUser
    if (params.username === loggedInUser.username.toLowerCase()) {
      console.log("It was the same user");
      setCurrentUser(true);
      setUser(loggedInUser);
    } else {
        dispatch(fetchUserByUsername(params.username)).then((response) => {
          setUser(response.payload);
          setCurrentUser(false);
        });
    }
  }, [loggedInUser, dispatch]);

  console.log("user", user);

  return (
    <Grid container style={{ marginTop: "3em" }}>
      <Grid item xs={12} md={6} lg={4}>
        <img
          src={user.avatar ? user.avatar : default_avatar}
          className="avatarBig"
          alt="user avatar"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {currentUser ? (
          <>
            <Typography variant="h4" style={{ marginTop: "1em" }}>
              Hello {user.first_name}!
            </Typography>{" "}
            <Typography variant="h5" style={{ marginTop: "1em" }}>
              Username: {user.username}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "1em" }}>
              email: {user.email}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" style={{ marginTop: "1em" }}>
              {params.username}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "1em" }}>
              {user.first_name}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "1em" }}>
              {user.city}, {user.state}
            </Typography>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={12} lg={12} style={{ marginTop: "1em" }}>
        {currentUser ? (
          <>
            {" "}
            <CommonButton style={{ marginLeft: "5em" }}>
              Edit Info
            </CommonButton>{" "}
            <Link to={`/users/${user.username}/my-listed-items`}>
              <CommonButton style={{ marginLeft: "2em" }}>
                My Listed Items
              </CommonButton>{" "}
            </Link>
          </>
        ) : (
          <>
            {soonestDeadlineItems?.length > 1 ? (
              <>
                <h2 className="center">Items with Soonest Deadlines:</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "40px",
                  }}
                >
                  <Link>
                    <CommonButton>Show All</CommonButton>
                  </Link>
                </div>
                <Box
                  width="100%"
                  padding={2}
                  margin={2}
                  style={{ display: "flex" }}
                >
                  {soonestDeadlineItems?.map((item) => (
                    <BigResultCard result={item} />
                  ))}
                </Box>
              </>
            ) : null}
          </>
        )}
      </Grid>{" "}
    </Grid>
  );
};

export default UserAccount;
