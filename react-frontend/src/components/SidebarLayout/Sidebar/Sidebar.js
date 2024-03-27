import "./Sidebar.css";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ links, activeRoute }) => {
  // console.log("links from SideBar", links);
  return (
    <div className="sidebar">
      {links?.map((group, index) => (
        <div key={index}>
          <h2>{group.label}</h2>
          {group.expandable && (
            <ul>
              {group.links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className={activeRoute === link.to ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!group.expandable && ( // Render only links
            <ul>
              {group.links.map((link, i) => (
                <li key={i}>
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
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
