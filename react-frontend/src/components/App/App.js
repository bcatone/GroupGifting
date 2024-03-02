
import "./App.css";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import NavBar from "./NavBar";
import ItemLookup from "./ItemLookup";
import Donation from "./Donation";
import SideBar from "./SideBar";
import Restricted from "./Restricted";
import SideBarLayout from "./SideBarLayout";
import Item from "./Item"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/authActions';
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Hero from '../Hero/Hero';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import Auth from './Auth';
import Main from './Main'



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
    }
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

          <Route path="main/" element={<Main/>} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          {/* <Route path="/not-found" element={<NotFound />} /> */}
          <Route path="/restricted" element={<Restricted />} />
          <Route path="items/" element={<SideBarLayout />}>
            <Route path={"all/"} element={<ItemLookup />} />
            <Route path={":id/"} element={<Item />}>
              {/* <Route path={"edit/"} element={<EditItem />} /> */}
            </Route>
            <Route path="users/" element={<SideBarLayout />}>
              {/* <Route path=":username/" element={<UserAccount />} />  */}
              {/* <Route path=":username/edit" element={<EditAccount/>} /> */}
              {/* <Route path="connections/" element={<Connections />} /> */}
              {/* <Route path="all/" element={<AllUsers />} /> */}
            </Route>
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


