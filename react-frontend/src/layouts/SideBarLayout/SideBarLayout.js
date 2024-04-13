import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/Sidebar/SideBar";
import useSideBarLinks from "../../components/hooks/useSideBarLinks";

const SideBarLayout = () => {
  const location = useLocation();
  const sideBarLinks = useSideBarLinks(location.pathname);

  /// get state from in this component and pass it down to sidebar

  return (
    <div style={{ display: "flex", marginTop:"5%", marginLeft:"5%"}}>
      <SideBar links={sideBarLinks} activeRoute={location.pathname} />
      <div style={{ width: "100%", backgroundColor: "#F2F2F2", marginLeft:"5%", marginRight:"5%", borderRadius:"25px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarLayout;
