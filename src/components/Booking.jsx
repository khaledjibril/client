import React from "react";

const Booking = ({ eventType, eventDate, eventTime, address }) => {
  return (
    <div className="flex flex-col gap-10 sm:gap-18 text-[#504230] not-last:mb-8 not-last:border-b p-6">
      <div className="flex flex-col gap-6 sm:gap-10">
        <h1 className="text-[1.6rem] sm:text-[1.8rem] capitalize font-bold leading-7 sm:leading-0">
          Booking for {eventType}
        </h1>
        <div>
          <p className="text-[#8a775c] text-[1.4rem] sm:text[1.6rem] leading-7 sm:leading-0">
            Date: <span>{eventDate}</span>, <span>{eventTime}</span>
          </p>
        </div>
      </div>
      <div>
        <p className="text-[1.4rem] sm:text-]1.6rem] leading-7 sm:leading-0">
          Address: {address}
        </p>
      </div>
    </div>
  );
};

export default Booking;
