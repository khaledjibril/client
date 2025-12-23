"use strict";

const Message = ({ title, message, backgroundColor, isVisible }) => {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-6 rounded-lg w-md sm:w-xl absolute bottom-10 right-6 px-12 py-10 z-50 ${backgroundColor} ${
        isVisible
          ? "opacity-100 translate-y-0 duration-500 ease-in-out"
          : "opacity-0 translate-y-6 pointer-events-none duration-300"
      }`}
    >
      <h1 className="font-medium capitalize leading-7 sm:leading-0 text-white">
        {title}
      </h1>
      <p className="leading-7 text-[1.4rem] text-white">{message}</p>
    </div>
  );
};

export default Message;
