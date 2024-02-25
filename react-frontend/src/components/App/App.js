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
import Item from "./Item"

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
      <Routes>
        <Route path={"/"} element={<Outlet />}>
          <Route
            index
            element={isLoggedIn ? <Navigate to={"main/"} /> : <Hero />}
          />
          {/* <Route path="login/" element={<Login />} /> */}
          {/* <Route path="signup/" element={<Signup />} /> */}
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


