import React, { useEffect, useState } from "react";
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

  const [selected, setSelected] = useState("");

  /// only button knows it's selected

  const { searchQuery, setSearchQuery, handleItemSearch, handleItemFilter } =
    useItemFilter();

  const searched = useSelector((state) => state.item.searched);
  // const selectedCategory = useSelector((state) => state.item.selectedCategory);
  // console.log("selectedCategory from state", selectedCategory);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  const handleSearchInput = (e) => {
    if (searched === true) {
      dispatch(resetDisplayedItems());
      setSearchQuery("");
      dispatch(toggleSearched());
    } else {
      setSearchQuery(e.target.value);
    }
  };

  const handleButtonClick = (category) => {
    if (category.name === selected) {
      console.log("category was same as selected")
      setSelected("");
      dispatch(resetDisplayedItems());
    } else {
      setSelected(category.name);
      handleItemFilter(category.name);
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
                  {categories &&
                    categories.map((category) =>
                      category.name === selected ? (
                        <CategoryButton
                          key={category.name}
                          backgroundColor={category.color}
                          value={category.name}
                          onClick={() => handleButtonClick(category)}
                          style={{
                            border: "3px solid black",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {category.name}
                        </CategoryButton>
                      ) : (
                        <CategoryButton
                          key={category.name}
                          backgroundColor={category.color}
                          value={category.name}
                          onClick={() => handleButtonClick(category)}
                        >
                          {category.name}
                        </CategoryButton>
                      )
                    )}
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
