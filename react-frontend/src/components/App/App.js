import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { setUser } from "../../redux/actions/authActions";
import NavBar from "./NavBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import About from "./About";
import Give from "./Give";
import Connections from "./Connections";
import ItemLookup from "../pages/Item/ItemLookup";
import Donation from "../pages/Donation";
import SideBar from "../pages/Sidebar/SideBar";
import Restricted from "../pages/Restricted";
import SideBarLayout from "./SideBarLayout";
import Item from "../pages/Item/Item";
import Hero from "../Hero/Hero";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Main from "../pages/Main";
import GiveAwayItem from "../pages/Item/GiveAwayItem";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

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
        <title>Group Gifting</title>
        <link rel="canonical" href="" />
      </Helmet> */}
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Outlet />}>
          <Route
            index
            element={isLoggedIn ? <Navigate to="main/" /> : <Hero />}
          />
          <Route path="main/" element={<Main />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          {/* <Route path="/not-found" element={<NotFound />} /> */}
          <Route path="/restricted" element={<Restricted />} />
          <Route path="items/" element={<SideBarLayout />}>
            <Route path={"all/"} element={<ItemLookup />} />
            <Route path={"new/"} element={<GiveAwayItem />} />
            <Route path={":id/"} element={<Item />}>
              {/* <Route path={"edit/"} element={<EditItem />} /> */}
            </Route>
          </Route>
          <Route path="users/" element={<SideBarLayout />}>
            {/* <Route path=":username/" element={<UserAccount />} />  */}
            {/* <Route path=":username/edit" element={<EditAccount/>} /> */}
            {/* <Route path="connections/" element={<Connections />} /> */}
            {/* <Route path="all/" element={<AllUsers />} /> */}
          </Route>
        </Route>
        <Route path="connections/" element={<SideBarLayout />}>
          {/* <Route index element={<Connections />} /> */}
        </Route>
      </Routes>
      ;
    </>
  );
}

export default App;
