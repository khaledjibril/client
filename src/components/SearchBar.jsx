"use strict";

import { CiSearch } from "react-icons/ci";

const SearchBar = ({ continerClass, className, iconClass, placeholder }) => {
  return (
    <div className={continerClass}>
      <CiSearch className={iconClass} />
      <input
        type="search"
        name=""
        id=""
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;