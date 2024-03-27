import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSearchedItems,
  fetchFilteredItems,
  fetchAllItems,
} from "../../redux/slices/itemSlice";

const useItemFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searched, setSearched] = useState(false);

  const allItems = useSelector((state) => state.item.allItems);

  // const handleAllItems = (distance) => {
  //     console.log("distance from handleAllItems", distance)
  //     fetchAllItems(distance)
  // }

  const handleAllItems = (distance) => {
    console.log("distance from handleAllItems", distance);
    dispatch(fetchAllItems(distance)).then((action) => {
      if (fetchAllItems.fulfilled.match(action)) {
        console.log("fetchAllItems Was successful! 🙏");
      } else if (fetchAllItems.rejected.match(action)) {
        console.log("fetchAllItems was unsuccessful 🤨");
      }
    });
  };

  const handleItemSearch = (searchQuery, distance) => {
    setItems(allItems);
    dispatch(fetchSearchedItems({ searchQuery, distance })).then((action) => {
      if (fetchSearchedItems.fulfilled.match(action)) {
        setSearched(true);
        setNoResults(false);
      } else if (fetchSearchedItems.rejected.match(action)) {
        setNoResults(true);
      }
    });
  };

  const handleItemFilter = (category, distance) => {
    console.log("category from HIF", category);
    setItems(allItems);
    dispatch(fetchFilteredItems({ category, distance })).then((action) => {
      if (fetchFilteredItems.fulfilled.match(action)) {
        // setSearched(true);
        setNoResults(false);
      } else if (fetchSearchedItems.rejected.match(action)) {
        setNoResults(true);
      }
    });
  };

  return {
    items,
    noResults,
    searched,
    searchQuery,
    setSearchQuery,
    handleItemSearch,
    handleItemFilter,
    setItems,
    handleAllItems,
  };
};

export default useItemFilter;
