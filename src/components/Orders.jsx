"use strict";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Order from "./Order";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatAmount = (amount) => {
    if (!amount) return "₦0";
    return `₦${Number(amount).toLocaleString()}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://photography-server-catq.onrender.com/api/orders/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (loading)
    return (
      <p className="text-center mt-8 text-xl">
        Loading your orders...
      </p>
    );

  if (!orders.length)
    return (
      <p className="text-center mt-8 text-xl">
        No orders found.
      </p>
    );

  return (
    <div className="flex flex-col gap-6 px-4 md:px-12">
      {orders.map((order) => (
        <Order
          key={order.id}
          orderID={order.id}
          orderDate={formatDate(order.created_at)}
          status={"Completed"}
          amount={formatAmount(order.total_price)}
          image={order.image_path}
          size={order.size}
          frame={order.frame}
          frameType={order.frame_type}
          address={order.address}
        />
      ))}
    </div>
  );
};

export default Orders;
