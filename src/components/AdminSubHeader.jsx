import React from "react";

const AdminSubHeader = ({
  containerClass,
  title,
  text,
  titleClass,
  textClass,
}) => {
  return (
    <div className={containerClass}>
      <h1 className={titleClass}>{title}</h1>
      <p className={textClass}>{text}</p>
    </div>
  );
};

export default AdminSubHeader;