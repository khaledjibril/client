"use strict";

const InputField = ({ type, className, id, onChange, ...props }) => {
  return (
    <>
      <input
        type={type}
        name=""
        id={id}
        className={className}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

export default InputField;
