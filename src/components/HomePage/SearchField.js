import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, setSearchQuery } from "slice/searchSlice";

export default function SearchField() {
  const dispatch = useDispatch();
  const collecting = useRef(null);
  const handleSearch = async (e) => {
    try {
      const searchQuery = e.target.value;
      if (collecting.current) {
        clearTimeout(collecting.current);
      }

      collecting.current = setTimeout(() => {
        if (searchQuery.length === 0) {
          dispatch(resetSearch());
        } else {
          dispatch(setSearchQuery({ searchQuery, isSearching: true }));
        }
      }, 100);
    } catch (error) {
      console.log("🚀 ~ file: SearchField.js:10 ~ handleSearch ~ error", error);
    }
  };
  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        <input
          type="text"
          className=" w-full px-4 py-2 text-gray-700 bg-white border rounded-full  focus:outline-none "
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
