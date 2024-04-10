import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchUserById } from "../redux/slices/userSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import default_avatar from "../../assets/images/defaultavatar.jpg"
import { Grid, Typography, Container } from "@mui/material";
import CommonButton from "../../components/common/CommonButton";

const UserAccount = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState("");
  const [user, setUser] = useState({});

  const loggedInUser = useSelector((state) => state.auth.user);

  console.log("loggedInUser", loggedInUser);

  console.log("params", params);

  useEffect(() => {
    // if user in params same as loggedInUser
    if (params.username === loggedInUser.username.toLowerCase()) {
      console.log("It was the same user");
      setCurrentUser(true);
      setUser(loggedInUser);
    } else {
      //   dispatch(fetchUserById(userId)).then((response) => {
      //     setUser(response.payload);
      //     setCurrentUser(false);
      //   });
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
          <Typography variant="h3">{user.username}</Typography>
        )}{" "}
      </Grid>
      <Grid item xs={12} md={6} lg={4} style={{ marginTop: "1em" }}>
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
        ) : null}
      </Grid>{" "}
    </Grid>
  );
};

export default UserAccount;
