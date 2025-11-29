import React from "react";

const Order = ({ orderID, orderDate, status, amount }) => {
  return (
    <div className="flex flex-col gap-16 text-[#8a775c] not-last:mb-8 not-last:border-b p-6">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 font-bold text-[1.8rem] text-[#504230]">
          <h1 className="capitalize">Order</h1> <span># {orderID}</span>
        </div>
        <div className="flex gap-4">
          <p>Date:</p> <span>{orderDate}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <p>Status:</p>
          <span className="font-bold capitalize text-[#504230]">{status}</span>
        </div>
        <div className="flex gap-4">
          <p className="capitalize text-[#504230]">total:</p>
          <span className="text-[#504230]">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default Order;
