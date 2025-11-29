import React from "react";

const DownloadBtn = ({ className, text, icon, type }) => {
  return (
    <button className={className} type={type}>
      {icon} {text}
    </button>
  );
};

export default DownloadBtn;