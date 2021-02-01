import React from "react";

import "./searchBox.styles.css";

const SearchBox = ({ value, placeholder, handleChange }) => {
  return (
    <input
      type="search"
      autoFocus
      value={value}
      className="searchBox"
      placeholder={placeholder}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
};

export default SearchBox;
