import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import ItemLookup from "../../pages/Item/ItemLookup";
// import Donation from "../pages/Donation";
import SideBar from "./SideBar";
import Restricted from "../../pages/Restricted";
import SideBarLayout from "./SideBarLayout";
import Item from "../../pages/Item/Item";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Hero from "../Hero/Hero";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
// import Auth from "./Auth";
import GiveAwayItem from "../../pages/Item/GiveAwayItem";
import EditItem from "../../pages/Item/EditItem";

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
          <Route index element={isLoggedIn ? <Navigate to="/" /> : <Hero />} />

          {/* <Route path="main/" element={<Main />} /> */}
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          {/* <Route path="/not-found" element={<NotFound />} /> */}
          <Route path="/restricted" element={<Restricted />} />
          <Route path="items/" element={<SideBarLayout />}>
            <Route path={"all/"} element={<ItemLookup />} />
            <Route path={"new/"} element={<GiveAwayItem />} />
            <Route path={":id/edit/"} element={<EditItem />} />
            <Route path={":id/"} element={<Item />} />
          </Route>
          <Route path="users/" element={<SideBarLayout />}>
            {/* <Route path=":username/" element={<UserAccount />} />  */}
            {/* <Route path=":username/edit" element={<EditAccount/>} /> */}

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
