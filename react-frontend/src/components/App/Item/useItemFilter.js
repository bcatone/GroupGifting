import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilteredItems } from "../../../redux/slices/itemSlice";

const useItemFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searched, setSearched] = useState(false);

    const allItems = useSelector((state) => state.item.allItems);

  //   const handleItemSearch = async () => {
  //     try {
  //       const response = await axios.get("/items/search", {
  //         params: { q: searchQuery },
  //       });
  //       if (response.data.length > 0) {
  //         setItems(response.data);
  //         setSearched(true);
  //         setNoResults(false);
  //       } else {
  //         setNoResults(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleItemSearch = (searchQuery) => {
    setItems(allItems)
    dispatch(fetchFilteredItems({ searchQuery })).then((action) => {
      if (fetchFilteredItems.fulfilled.match(action)) {
        setSearched(true);
        setNoResults(false);
      } else if (fetchFilteredItems.rejected.match(action)) {
        setNoResults(true);
      }
    });
  };

    /// used to setItems(allItems) but took that out ⬇️

  const resetResults = () => {
    setSearchQuery("");
    setNoResults(false);
    setSearched(false);
    setItems([]); // Set items to an empty array
  };

  return {
    items,
    noResults,
    searched,
    searchQuery,
    setSearchQuery,
    handleItemSearch,
resetResults,
    setItems,
  };
};

export default useItemFilter;
