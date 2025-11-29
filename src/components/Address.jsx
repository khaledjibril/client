"use strict";

const Address = ({
  containerClass,
  labelClass,
  htmlFor,
  title,
  textareaClass,
  id,
  placeholder,
}) => {
  return (
    <>
      <div className={containerClass}>
        <label htmlFor={htmlFor} className={labelClass}>
          {title}
        </label>
        <textarea
          name=""
          id={id}
          className={textareaClass}
          placeholder={placeholder}
        ></textarea>
      </div>
    </>
  );
};

export default Address;
