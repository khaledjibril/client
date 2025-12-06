"use strict";

import CompanyName from "./CompanyName";

import { CiCamera } from "react-icons/ci";
import { Link } from "react-router-dom";

const Logo = ({ path }) => {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 text-text-foreground tracking-wide font-bold text-[1.4rem] sm:text-[1.8rem] lg:text-[2rem] capitalize leading-5 sm:leading-0"
    >
      <CiCamera className="text-muted-foreground text-[2rem] sm:text-[2.6rem]" />
      <CompanyName />
    </Link>
  );
};

export default Logo;
