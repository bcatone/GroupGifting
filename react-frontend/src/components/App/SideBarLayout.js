import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

const SideBarLayout = () => {
  const location = useLocation();

  // put state for filter here

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
    ];
  } else {

    sidebarLinks = [
      {
        label: "Default",
        links: [{ to: "/default", label: "Default Link" }],
      },
    ];
  }


  return (
    <div style={{ display: "flex" }}>
      <SideBar links={sidebarLinks} activeRoute={location.pathname} />
      <div style={{width:"100%"}}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarLayout;
