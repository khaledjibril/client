"use strict";

import { CiSearch } from "react-icons/ci";

const SearchBar = ({
  continerClass,
  className,
  iconClass,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={continerClass}>
      <CiSearch className={iconClass} />
      <input
        type="search"
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
