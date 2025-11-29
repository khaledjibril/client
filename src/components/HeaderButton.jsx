"use strict";

// Icons
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const HeaderButton = ({ onClick, isOpen }) => {
  return (
    <button
      className="btn-mobile-nav p-4 border border-[#d8d8b2] rounded-md cursor-pointer lg:hidden"
      onClick={onClick}
    >
      {/* Menu icon (default) */}
      <IoMdMenu
        className={`icon-mobile-nav ${isOpen ? "hidden" : "block"}`}
      />

      {/* Close icon (when nav open) */}
      <IoMdClose
        className={`icon-mobile-nav ${isOpen ? "block" : "hidden"} border rounded-md p-4 border-[#a68b64]`}
      />
    </button>
  );
};

export default HeaderButton;
