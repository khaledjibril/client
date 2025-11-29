"use strict";

const Button = ({ className, type, onClick, text, icon }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
      {icon}
    </button>
  );
};

export default Button;
