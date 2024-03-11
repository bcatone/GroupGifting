import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import useItemFilter from "../Item/useItemFilter";
import CategoryButton from "../Common/CategoryButton";
import { categories } from "../Common/categories";
import { useSelector, useDispatch } from "react-redux";
import {
  resetDisplayedItems,
  toggleSearched,
} from "../../../redux/slices/itemSlice";

const SideBar = ({ links, activeRoute }) => {
  const dispatch = useDispatch();

  const { searchQuery, setSearchQuery, handleItemSearch } = useItemFilter();

  const searched = useSelector((state) => state.item.searched);

  const itemState = useSelector((state) => state.item);

  const handleSearchInput = (e) => {
    if (searched === true) {
      dispatch(resetDisplayedItems());
      setSearchQuery("");
      dispatch(toggleSearched());
    } else {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <div className="SideBar">
      {links?.map((group, index) => (
        <div key={index}>
          <h2 className="center">{group.label}</h2>
          <ul>
            {activeRoute === `/items/all` && (
              <>
                <div style={{ display: "flex", marginBottom: "1em" }}>
                  <Typography variant="h5">Search:</Typography>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e)}
                    style={{ width: "175px", height: "35px" }}
                  />
                  <CommonButton onClick={() => handleItemSearch(searchQuery)}>
                    Submit
                  </CommonButton>
                </div>
                <div>
                  {categories?.map((category) => (
                    <CategoryButton
                      key={category.name}
                      backgroundColor={category.color}
                      value={category.name}
                    >
                      {category.name}
                    </CategoryButton>
                  ))}
                </div>
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
