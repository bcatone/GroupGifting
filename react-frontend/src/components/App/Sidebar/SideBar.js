import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Slider, Box } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import useItemFilter from "../Item/useItemFilter";
import CategoryButton from "../Common/CategoryButton";
import { categories } from "../Common/categories";
import { useSelector, useDispatch } from "react-redux";
import {
  resetDisplayedItems,
  toggleSearched,
} from "../../../redux/slices/itemSlice";
import CommonSquareButton from "../Common/CommonSquareButton";

const SideBar = ({ links, activeRoute }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("");
  const [distance, setDistance] = useState(5)

  /// only button knows it's selected


  const { searchQuery, setSearchQuery, handleItemSearch, handleItemFilter, handleAllItems } =
    useItemFilter();


  useEffect(() => {
    console.log("distance", distance);
    if (distance){
          handleAllItems(distance);
    }

  }, [distance]);

  const searched = useSelector((state) => state.item.searched);
  // const selectedCategory = useSelector((state) => state.item.selectedCategory);
  // console.log("selectedCategory from state", selectedCategory);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  const handleSearchInput = (e) => {
    if (searched === true) {
      dispatch(resetDisplayedItems());
      dispatch(toggleSearched());
    } else {
      setSearchQuery(e.target.value);
    }
  };

  const handleClick = () => {
    setSearchQuery("")
   setSelected("");
    dispatch(resetDisplayedItems());
  }

  const handleButtonClick = (category) => {
    if (category.name === selected) {
      console.log("category was same as selected");
      setSelected("");
      dispatch(resetDisplayedItems());
    } else {
      setSelected(category.name);
      handleItemFilter(category.name, distance);
    }
  };

  const handleDistanceChange = (event, newValue) => {
setDistance(newValue)
console.log("value after HDC", newValue)

// If selected !== ("")
if (selected !== ""){
  // Resend filter request
  handleItemFilter(category.name, newValue);
}

// If searchQuery !=("")
if (searchQuery !== ""){
// resend search request
handleItemSearch(searchQuery, newValue)
  }
else {
  // display all items in search radius
  handleAllItems(newValue)
}
  }



  const marks = [
    {
      value: 1,
      label: "1 mi",
    },
    {
      value: 6,
      label: "6 mi",
    },
    {
      value: 11,
      label: "11 mi",
    },
    {
      value: 16,
      label: "16 mi",
    },
  ];

  function valuetext(value) {
    return `${value} Mi`;
  }
  // try to get rid of this ^

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
                    onClick={() => handleClick()}
                    onChange={(e) => handleSearchInput(e)}
                    style={{ width: "175px", height: "35px" }}
                  />
                  <CommonButton
                    onClick={() => handleItemSearch(searchQuery, distance)}
                  >
                    Submit
                  </CommonButton>
                </div>
                <div>
                  <CommonSquareButton
                    style={{ marginBottom: "1em", marginTop: "1em" }}
                  >
                    Clear All
                  </CommonSquareButton>
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
            <Box
              sx={{
                width: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5>Distance away from your city</h5>
              <Slider
                aria-label="Custom marks"
                defaultValue={5}
                getAriaValueText={valuetext}
                step={5}
                max={20}
                min={1}
                value={distance}
                onChange={handleDistanceChange}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Box>

            <CommonButton style={{ marginBottom: "1em", marginTop: "1em" }}>
              Show All Items Regardless
            </CommonButton>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
