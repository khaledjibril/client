"use strict";

const Message = ({ title, message, backgroundColor }) => {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-6 rounded-lg w-md sm:w-xl absolute bottom-10 right-6 px-12 py-10 z-50 ${backgroundColor}`}
    >
      <h1 className="font-medium capitalize leading-7 sm:leading-0">{title}</h1>
      <p className="leading-7 text-[1.4rem]">{message}</p>
    </div>
  );
};

export default Message;