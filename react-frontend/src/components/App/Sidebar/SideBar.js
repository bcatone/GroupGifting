import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideBar = ({ links, activeRoute }) => {
   const location = useLocation();

   console.log("location.pathname from SideBar", location.pathname)
  console.log("activeRoute", activeRoute)
  return (
    <div className="SideBar">
      {links?.map((group, index) => (
        <div key={index}>
          <h2 className="center">{group.label}</h2>
          <ul>
            {activeRoute === `/items/all` && (
              <>
                <Typography variant="h5">Search:</Typography>
                <input
                  type="text"
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "200px", height: "30px" }}
                />
                {/* <CommonButton onClick={handleSearch}>Submit</CommonButton> */}
              </>
            )}
            {group.links.map((link, i) => (
              <li className="nodots" key={i}>
                <Link
                  to={link.to}
                  className={
                    activeRoute === link.to ? "active nodots" : "nodots"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
