
// updated imports
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./redux/slices/authSlice";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SidebarLayout from "./layouts/SidebarLayout/SidebarLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import MessageBar from "./components/MessageBar/MessageBar";
import ItemLookup from "./pages/Items/ItemLookup";
import Item from "./pages/Items/Item";
import GiveAwayItem from "./pages/Items/GiveAwayItem";
import MessagingPage from "./pages/MessagingPage";
import Restricted from "./pages/Restricted";
// end updated imports

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => Boolean(state.auth.user));

  // Check if the user is logged in
  useEffect(() => {
      dispatch(fetchMe());
  }, []);

  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Group Gifting</title>
        <link rel="canonical" href="" />
      </Helmet> */}
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Outlet />}>
          <Route
            index
            element={isLoggedIn ? <Navigate to="main/" /> : <LandingPage />}
          />
          <Route path="main/" element={<Main />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          {/* <Route path="/not-found" element={<NotFound />} /> */}
          <Route path="/restricted" element={<Restricted />} />
          <Route path="items/" element={<SidebarLayout />}>
            <Route path={"all/"} element={<ItemLookup />} />
            <Route path={"new/"} element={<GiveAwayItem />} />
            <Route path={":id/"} element={<Item />}>
              {/* <Route path={"edit/"} element={<EditItem />} /> */}
            </Route>
          </Route>
          <Route path="users/" element={<SidebarLayout />}>
            {/* <Route path=":username/" element={<UserAccount />} />  */}
            {/* <Route path=":username/edit" element={<EditAccount/>} /> */}
            {/* <Route path="connections/" element={<Connections />} /> */}
            {/* <Route path="all/" element={<AllUsers />} /> */}
          </Route>
        </Route>
        <Route path="connections/" element={<SidebarLayout />}>
          {/* <Route index element={<Connections />} /> */}
        </Route>
        {/* <Route path="messages/" element={<MessagingPage />} /> */}
        <Route path="messages/" element={<SidebarLayout />}>
          <Route index element={<MessagingPage />} />
        </Route>
      </Routes>
      { isLoggedIn ? <MessageBar /> : null}
    </>
  );
}

export default App;
