"use strict";

// COMPONENTS
import Order from "./Order";

const Orders = () => {
  return (
    <div>
      <Order
        orderID={"e35CTB3"}
        orderDate={"11/1/2025"}
        status={"Processing"}
        amount={"₦75,000"}
      />
      <Order
        orderID={"e35CTB3"}
        orderDate={"11/1/2025"}
        status={"Processing"}
        amount={"₦75,000"}
      />
    </div>
  );
};

export default Orders;
