import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Slider, Box } from "@mui/material";
import CommonButton from "../common/CommonButton";
import useItemFilter from "../hooks/useItemFilter";
import CategoryButton from "../common/CategoryButton";
import { categories } from "../common/categories";
import { statuses } from "../common/statuses";
import { useSelector, useDispatch } from "react-redux";
import {
  resetDisplayedItems,
  toggleSearched,
  fetchAllItems,
} from "../../redux/slices/itemSlice";
import CommonSquareButton from "../common/CommonSquareButton";
import { setSelectedStatus } from "../../redux/slices/itemSlice";

const SideBar = ({ links, activeRoute }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("");
  const [distance, setDistance] = useState(5);

    const selectedStatus = useSelector((state) => state.item.selectedStatus);


  const {
    searchQuery,
    setSearchQuery,
    handleItemSearch,
    handleItemFilter,
    handleAllItems,
  } = useItemFilter();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
   setSelectedStatus("Available")
  }, []);

  useEffect(() => {
console.log("selectedStatus", selectedStatus)
  }, [selectedStatus])

  console.log("activeRoute", activeRoute);

  console.log("user", user, "user.username", user.username);

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


  const handleStatusSelect = (status) => {
    if (status.name === selectedStatus) {
        
  dispatch(setSelectedStatus('Available'));
      // handleAllItems(distance);
      /// need to clear the selection back to original ("Available")
    } else {
        dispatch(setSelectedStatus(status.name));
      // handleItemFilter(category.name, distance);
      /// filtered the items to the category and distance
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
            {user.username &&
              activeRoute === `/users/${user.username}/my-listed-items` && (
                <div>
                  <h2>Select your items with a status of:</h2>
                  <ul>
                    {statuses &&
                      statuses.map((status) =>
                        status.name === selectedStatus ? (
                          <CategoryButton
                            key={status.name}
                            backgroundColor={status.color}
                            value={status.name}
                            onClick={() => handleStatusSelect(status)}
                            style={{
                              border: "3px solid black",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "1.3em", // Increase font size by 50%
                              padding: "0.5em 1.0em", // Increase padding by 50%
                            }}
                          >
                            {status.name}
                          </CategoryButton>
                        ) : (
                          <CategoryButton
                            key={status.name}
                            backgroundColor={status.color}
                            value={status.name}
                            onClick={() => handleStatusSelect(status)}
                            style={{
                              fontSize: "1.3em", // Increase font size by 50%
                              padding: "0.5em 1.0em", // Increase padding by 50%
                            }}
                          >
                            {status.name}
                          </CategoryButton>
                        )
                      )}
                  </ul>
                </div>
              )}
            {user.username && activeRoute === `/users/${user.username}` && (
              <div>
                <Link to={`/users/${user.username}/my-listed-items`}>
                  <Typography style={{ fontSize: "20px", color: "white" }}>
                    My Listed Items
                  </Typography>
                </Link>
              </div>
            )}

            {activeRoute === `/items/all` && (
              <>
                <div
                  style={{
                    display: "flex",
                    // marginBottom: "1em",
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

                <div style={{ marginTop: "1em" }}>
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
