import "./App.css";
import axios from 'axios'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import { fetchMe } from "./redux/slices/authSlice"
import NavBar from "./components/NavBar/NavBar"
import SideBarLayout from "./layouts/SideBarLayout/SideBarLayout";
// import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main";
// import MessageBar from "./components/MessageBar/MessageBar";
import ItemLookup from "./pages/Items/ItemLookup";
import Item from "./pages/Items/Item";
import EditItem from "./pages/Items/EditItem";
import GiveAwayItem from "./pages/Items/GiveAwayItem";
import MyListedItems from "./pages/Items/MyListedItems";
import Restricted from "./pages/Restricted";
// import Donation from "../pages/Donation";
import { setUser } from "./redux/actions/authActions";
import UserAccount from "./pages/Users/UserAccount";
import MyRequestedItems from "./pages/Items/MyRequestedItems";
import EditUser from "./pages/Users/EditUser";


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
            element={isLoggedIn ? <Navigate to="main/" /> : <Login />}
          />

          <Route path="main/" element={<Main />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          {/* <Route path="/not-found" element={<NotFound />} /> */}
          <Route path="/restricted" element={<Restricted />} />
          <Route path="items/" element={<SideBarLayout />}>
            <Route path={"all/"} element={<ItemLookup />} />
            <Route path={"new/"} element={<GiveAwayItem />} />
            <Route path={":id/edit/"} element={<EditItem />} />
            <Route path={":id/"} element={<Item />} />
            <Route path={"myrequests"} element={<MyRequestedItems/>}/>
          </Route>
          <Route path="users/" element={<SideBarLayout />}>
            <Route path=":username/" element={<UserAccount />} />
            <Route
              path=":username/my-listed-items"
              element={<MyListedItems />}
            />

            <Route path=":username/edit" element={<EditUser/>} />

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
