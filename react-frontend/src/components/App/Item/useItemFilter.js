import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchAllItems } from "../../../redux/slices/itemSlice";

const useItemFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searched, setSearched] = useState(false);

  const allItems = useSelector((state) => state.item.allItems);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  useEffect(()=> {
console.log("Change in items in UIF", items)
  }, [items])

  useEffect(() => {
    setItems(allItems);
  }, [allItems]);

const handleSearch = async () => {
  try {
    const response = await axios.get("/items/search", {
      params: { q: searchQuery },
    });
    if (response.data.length > 0) {
      await setItems(response.data); 
      setSearched(true);
      setNoResults(false);
    } else {
      setNoResults(true);
    }
  } catch (error) {
    console.error(error);
  }
};


  const resetResults = () => {
    setSearchQuery("");
    setNoResults(false);
    setSearched(false);
    setItems(allItems);
  };

  return {
    items,
    noResults,
    searched,
    searchQuery,
    setSearchQuery,
    handleSearch,
    resetResults,
  };
};

export default useItemFilter;
