import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchedItems } from "../../../redux/slices/itemSlice";

const useItemFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searched, setSearched] = useState(false);

    const allItems = useSelector((state) => state.item.allItems);



  const handleItemSearch = (searchQuery) => {
    setItems(allItems)
    dispatch(fetchSearchedItems({ searchQuery })).then((action) => {
      if (fetchSearchedItems.fulfilled.match(action)) {
        setSearched(true);
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
    setItems,
  };
};

export default useItemFilter;
