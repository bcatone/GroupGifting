import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Auth from './Auth';
import Main from './Main'
import { Navigate, Route, Routes } from "react-router-dom";
import ItemLookup from './ItemLookup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/authActions';

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
        <title>Vine Voice</title>
        <link rel="canonical" href="http://www.vinevoice.org" />
      </Helmet> */}
      <NavBar />
      {/* Added some routing for future pages: */}

      <Routes>
        <Route index element={<Navigate to={ isLoggedIn ? "/items/all" : "/main"} />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/users/new" element={<Auth />} /> 
        {/* <Route path="/donation-info" element={<Donation />} /> */}
        {/* <Route path="/items/new" element={<GiveawayItems />} /> */}
        <Route path="/items/all" element={<ItemLookup />} />
        {/* <Route path="/items/:id" element={<Item />} /> */}
        {/* <Route path="/users/connections" element={<Connections />} /> */}
        {/* <Route path="/users/:username" element={<UserAccount />} /> */}
        {/* <Route path="/users/:username/edit" element={<EditAccount />} /> */}
        {/* <Route path="/not-found" element={<NotFound />} /> */}
        {/* <Route path="/restricted" element={<Restricted />} />  */}
      </Routes>
    </>
  );
}

export default App;