import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Auth from './Auth';
import Main from './Main'
import { Route, Routes } from "react-router-dom";
import ItemLookup from './ItemLookup';

function App() {
  // const [testMessage, setTestMessage] = useState("");



  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Vine Voice</title>
        <link rel="canonical" href="http://www.vinevoice.org" />
      </Helmet> */}
      <NavBar />
      <Auth/>
      {/* Added some routing for future pages: */}

      <Routes>
        <Route path="/main" element={<Main />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/users/new" element={<CreateAccount />} />  */}
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