"use strict";

const FieldContainer = ({
  containerClass,
  labelClass,
  labelFor,
  title,
  inputField,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={labelFor} className={labelClass}>
        {title}
      </label>
      {inputField}
    </div>
  );
};

export default FieldContainer;
