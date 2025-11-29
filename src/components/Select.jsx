import React from "react";

const Select = ({ options, onChange, value, ...props }) => {
  return (
    <select onChange={onChange} value={value} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
