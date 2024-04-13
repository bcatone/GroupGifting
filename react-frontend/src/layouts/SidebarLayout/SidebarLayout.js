import "./SidebarLayout.css";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar";
import { getSidebarLinks } from "../../helpers/getSidebarLinks";

const SidebarLayout = () => {
  const location = useLocation();
  const sidebarLinks = getSidebarLinks(location.pathname);

  /// get state from in this component and pass it down to sidebar

  return (
    <div 
      className="sidebar-layout"
      // style={{ display: "flex" }}
    >
      <SideBar links={sidebarLinks} activeRoute={location.pathname} />
      <div 
      className="sidebar-layout__main"
        // style={{ width: "100%", backgroundColor: "#F2F2F2" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
