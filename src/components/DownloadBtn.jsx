import React from "react";

const DownloadBtn = ({ className, text, icon, type, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {icon} {text}
    </button>
  );
};

export default DownloadBtn;
