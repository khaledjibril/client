"use strict";

const Image = ({ src, alt, loading, className }) => {
  return <img src={src} alt={alt} loading={loading} className={className} />;
};

Image.defaultProps = {
  loading: "lazy",
  className: "",
};

export default Image;
