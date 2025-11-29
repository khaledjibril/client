"use strict";
import { Link } from "react-router-dom";

const Card = ({ title, icon, subheading, text, link, lintText, linkIcon }) => {
  return (
    <div className="flex flex-col gap-8 bg-[#f7f7e3] py-8 px-8 rounded-lg border border-[#eeeec3] shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col gap-2">
        <header>
          <h3 class="flex items-center gap-4 text-[#504230] capitalize text-4xl font-semibold">
            {icon}
            {title}
          </h3>
        </header>
        <p class="text-[#8a775c] text-[1.4rem] leading-[1.4]">{subheading}</p>
      </div>
      <p class="text-[#504230] leading-normal">{text}</p>
      <div class="flex">
        <Link
          to={link}
          className="flex items-center gap-4 p-2 text-[1.4rem] text-[#8a775c] hover:underline"
        >
          {lintText} {linkIcon}
        </Link>
      </div>
    </div>
  );
};

export default Card;
