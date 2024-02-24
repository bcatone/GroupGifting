import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Main from "./Main";
import { Route, Routes, Outlet } from "react-router-dom";
import ItemLookup from "./ItemLookup";
import Donation from "./Donation";
import SideBar from "./SideBar";
import Restricted from "./Restricted";
import SideBarLayout from "./SideBarLayout";

function App() {
  // const [testMessage, setTestMessage] = useState("");


  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Group Gifting</title>
        <link rel="canonical" href="" />
      </Helmet> */}
      <NavBar />

      {/* Added some routing for future pages: */}

      {/* SideBar Routes */}
      <Routes>
        <Route path="/" element={<SideBarLayout />}>
          <Route index element={<Main />} />
          {/* <Route path="/users/:username" element={<UserAccount />} /> */}
          {/* <Route path="/users/connections" element={<Connections />} /> */}
          <Route path="/donation-info" element={<Donation />} />
          <Route path="/items/all" element={<ItemLookup/>} />
          {/* <Route path="/items/:id" element={<Item />} /> */}

          {/* Not sure whether this page will have a sidebar ⬇️ */}
          {/* <Route path="/items/new" element={<GiveawayItems />} /> */}
        </Route>

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/users/new" element={<SignUp />} />  */}
        {/* <Route path="/users/:username/edit" element={<EditAccount />} /> */}
        {/* <Route path="/not-found" element={<NotFound />} /> */}
        <Route path="/restricted" element={<Restricted />} /> 
      </Routes>
    </>
  );
}

export default App;

