import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { getSidebarLinks } from "./getSidebarLinks";

const SideBarLayout = () => {
  const location = useLocation();
  const sidebarLinks = getSidebarLinks(location.pathname);

  /// get state from in this component and pass it down to sidebar

  return (
    <div style={{ display: "flex" }}>
      <SideBar links={sidebarLinks} activeRoute={location.pathname} />
      <div style={{ width: "100%", backgroundColor: "#F2F2F2" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarLayout;
