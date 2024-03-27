import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Slider, Box } from "@mui/material";
import CommonButton from "../../App/Common/CommonButton";
import useItemFilter from "../../App/useItemFilter";
import CategoryButton from "../../App/Common/CategoryButton";
import { categories } from "../../App/Common/categories";
import { useSelector, useDispatch } from "react-redux";
import {
  resetDisplayedItems,
  toggleSearched,
  fetchAllItems,
} from "../../../redux/slices/itemSlice";
import CommonSquareButton from "../../App/Common/CommonSquareButton";

const SideBar = ({ links, activeRoute }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("");
  const [distance, setDistance] = useState(5);

  /// only button knows it's selected

  const {
    searchQuery,
    setSearchQuery,
    handleItemSearch,
    handleItemFilter,
    handleAllItems,
  } = useItemFilter();

  useEffect(() => {
    if (selected !== "") {
      handleItemFilter(selected, distance);
    } else if (searchQuery !== "") {
      handleItemSearch(searchQuery, distance);
    } else {
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

  const handleClearAll = () => {
    if (searched === true) {
      dispatch(toggleSearched());
    }
    setSearchQuery("");
    setSelected("");
    // dispatch(resetDisplayedItems());
    handleAllItems(distance);
  };

  const handleClick = () => {
    setSearchQuery("");
    setSelected("");
    dispatch(resetDisplayedItems());
  };

  const handleButtonClick = (category) => {
    if (category.name === selected) {
      console.log("category was same as selected");
      setSelected("");
      handleAllItems(distance);
    } else {
      setSelected(category.name);
      handleItemFilter(category.name, distance);
    }
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handleShowAllItems = () => {
    console.log("handleShowAllItems was pressed");
    dispatch(fetchAllItems());
  };

  const marks = [
    {
      value: 1,
      label: "0 mi",
    },
    {
      value: 5,
      label: "5 mi",
    },
    {
      value: 10,
      label: "10 mi",
    },
    {
      value: 15,
      label: "15 mi",
    },
    { value: 20, label: "20 mi" },
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
                <div
                  style={{
                    display: "flex",
                    marginBottom: "1em",
                    height: "35px",
                  }}
                >
                  <Typography sx={{ fontSize: "130%" }}>Search:</Typography>

                  <input
                    type="search"
                    value={searchQuery}
                    onClick={() => handleClick()}
                    onChange={(e) => handleSearchInput(e)}
                    style={{ width: "175px", height: "40px" }}
                  />
                  <CommonButton
                    style={{ height: "40px" }}
                    onClick={() => handleItemSearch(searchQuery, distance)}
                  >
                    Submit
                  </CommonButton>
                </div>
                <div></div>
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
                <Box
                  sx={{
                    width: 350,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CommonSquareButton
                    style={{
                      height: "40px",
                      display: "flex",
                      marginTop: "1em",
                      marginBottom: "1em",
                    }}
                    onClick={() => handleClearAll()}
                  >
                    Clear All
                  </CommonSquareButton>
                  <h4>Distance away from your zip code</h4>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={5}
                    getAriaValueText={valuetext}
                    step={1}
                    max={20}
                    min={1}
                    value={distance}
                    onChange={handleDistanceChange}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </Box>

                <CommonButton
                  style={{ marginBottom: "1em", marginTop: "1em" }}
                  onClick={() => handleShowAllItems()}
                >
                  Show All Items Regardless
                </CommonButton>
              </>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
