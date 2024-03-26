import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/actions/authActions";
import NavBar from "./NavBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Hero from "../Hero/Hero";
import Main from "./Main";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import About from "./About";
import SideBarLayout from "./SideBarLayout";
import ItemLookup from "./ItemLookup";
import Item from "./Item";
import Give from "./Give";
import Connections from "./Connections";
import Donation from "./Donation";
import Restricted from "./Restricted";
import NotFound from "../NotFound/NotFound";


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
          <Route path="about/" element={<About />} />
          <Route path="users/" element={<SideBarLayout />}>
            {/* <Route path=":username/" element={<UserAccount />} />  */}
            {/* <Route path=":username/edit" element={<EditAccount/>} /> */}
            {/* <Route path="connections/" element={<Connections />} /> */}
            {/* <Route path="all/" element={<AllUsers />} /> */}
          </Route>
          <Route path="items/" element={<SideBarLayout />}>
            <Route index element={<Navigate to={"all/"} />} />
            <Route path={"all/"} element={<ItemLookup />} />
            <Route path={":id/"} element={<Item />}>
              {/* <Route path={"edit/"} element={<EditItem />} /> */}
            </Route>
            <Route path="give/" element={<Give />} />
          </Route>
          <Route path="connections/" element={<SideBarLayout />}>
            <Route index element={<Connections />} />
          </Route>
          <Route path="/donate" element={<SideBarLayout />}>
            <Route index element={<Donation />} />
          </Route>
          <Route path="restricted/" element={<Restricted />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
