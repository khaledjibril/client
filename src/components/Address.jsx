"use strict";

const Address = ({
  containerClass = "",
  labelClass = "",
  htmlFor,
  title,
  textareaClass = "",
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={htmlFor} className={labelClass}>
        {title}
      </label>

      <textarea
        id={id}
        className={textareaClass}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Address;
