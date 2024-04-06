import "./SidebarLayout.css";
import React from "react";
import SideBar from "./Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";


const SidebarLayout = () => {
  const location = useLocation();

  // Define sidebar links based on the current location
  let sidebarLinks;
  if (location.pathname === "/donation-info") {
    sidebarLinks = [
      {
        label: "Main",
        links: [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/profile", label: "Profile" },
        ],
      },
      // Add more link groups as needed for the /dashboard route
    ];
  } else if (location.pathname === "/items/all") {
    sidebarLinks = [
      {
        label: "Eventual Filter Options",
        links: [
          { to: "/", label: "Example Link 1" },
          { to: "/", label: "Example Link 2" },
        ],
      },
      // Add more link groups as needed for the /settings route
    ];
  } else {

    sidebarLinks = [
      {
        label: "Default",
        links: [{ to: "/default", label: "Default Link" }],
      },
    ];
  }

  // console.log("location.pathname", location.pathname)

  return (
    <div className="sidebar-layout">
      <SideBar links={sidebarLinks} activeRoute={location.pathname} />
      <div className="sidebar-layout__main">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;