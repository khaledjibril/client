import React from "react";

const ButtonText = ({ text, onClick, className, key }) => {
  return (
    <button key={key} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonText;
