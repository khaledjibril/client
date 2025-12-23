"use strict";

import React from "react";

const statusStyles = {
  completed: "bg-green-100 text-green-700",
  processing: "bg-yellow-100 text-yellow-700",
  pending: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const Order = ({ orderID, orderDate, status, amount }) => {
  const badgeStyle =
    statusStyles[status?.toLowerCase()] ||
    "bg-gray-100 text-gray-700";

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide">
            Order ID
          </h3>
          <p className="text-xl font-semibold text-gray-900">
            #{orderID}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${badgeStyle}`}
        >
          {status}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gray-100" />

      {/* Details */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Order Date</span>
          <span className="font-medium text-gray-800">
            {orderDate}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <span className="text-gray-500">Total Amount</span>
          <span className="text-lg font-bold text-gray-900">
            {amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Order;
