import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Hero from "../Hero/Hero";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
// import Auth from "./Auth";
import Main from "./Main";
import ItemLookup from "./ItemLookup";
import Inbox from "../Messages/Inbox/Inbox";
import DirectMessageConversation from "../Messages/DirectMessageConversation/DirectMessageConversation";


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get("/me");
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("User is not logged in");
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Vine Voice</title>
        <link rel="canonical" href="http://www.vinevoice.org" />
      </Helmet> */}
      <NavBar />

      {/* Added some routing for future pages: */}

      <Routes>
        <Route path={"/"} element={<Outlet />}>
          <Route
            index
            element={isLoggedIn ? <Navigate to={"/main"} /> : <Hero />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messages" element={<Inbox />} />
          <Route path="messages/:other_user_id" element={<DirectMessageConversation />} />
          <Route path="/main" element={<Main />} />
          {/* <Route path="/users/new" element={<Auth />} /> */}
          {/* <Route path="/donation-info" element={<Donation />} /> */}
          {/* <Route path="/items/new" element={<GiveawayItems />} /> */}
          <Route path="/items/all" element={<ItemLookup />} />
          {/* <Route path="/items/:id" element={<Item />} /> */}
          {/* <Route path="/users/connections" element={<Connections />} /> */}
          <Route path="messages/" element={<Inbox />} />
          <Route path="messages/:connection_id/" element={<DirectMessageConversation />} />
            {/* <Route path="/users/:username" element={<UserAccount />} /> */}
            {/* <Route path="/users/:username/edit" element={<EditAccount />} /> */}
            {/* <Route path="/not-found" element={<NotFound />} /> */}
            {/* <Route path="/restricted" element={<Restricted />} />  */}
          </Route>
      </Routes>
    </>
  );
}

export default App;
