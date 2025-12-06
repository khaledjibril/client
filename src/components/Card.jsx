"use strict";
import { Link } from "react-router-dom";

const Card = ({ title, icon, subheading, text, link, lintText, linkIcon }) => {
  return (
    <div className="flex flex-col gap-8 bg-background-accent py-8 px-8 rounded-lg border border-[#eeeec3] shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col gap-2">
        <header>
          <h3 class="flex items-center gap-4 text-text-foreground capitalize text-4xl font-semibold">
            {icon}
            {title}
          </h3>
        </header>
        <p class="text-muted-foreground text-[1.4rem] leading-[1.4]">
          {subheading}
        </p>
      </div>
      <p class="text-text-foreground leading-normal">{text}</p>
      <div class="flex">
        <Link
          to={link}
          className="flex items-center gap-4 p-2 text-[1.4rem] text-muted-foreground hover:underline"
        >
          {lintText} {linkIcon}
        </Link>
      </div>
    </div>
  );
};

export default Card;
