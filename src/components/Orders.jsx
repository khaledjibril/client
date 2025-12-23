"use strict";

import { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import Order from "./Order";

const ORDERS_PER_PAGE = 5;

const Orders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 🗓 Date formatter
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  // 💰 Currency formatter
  const formatAmount = (amount) =>
    `₦${Number(amount || 0).toLocaleString()}`;

  useEffect(() => {
    if (!user) return;

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

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setOrders(data ?? []);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ORDERS_PER_PAGE;
    return orders.slice(start, start + ORDERS_PER_PAGE);
  }, [orders, currentPage]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading your orders…
        </p>
      </div>
    );
  }

  // 📭 Empty state
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center mt-24 gap-2">
        <h3 className="text-xl font-semibold text-gray-700">
          No orders yet
        </h3>
        <p className="text-gray-500">
          Your completed orders will appear here.
        </p>
      </div>
    );
  }

  return (
<section className="w-full max-w-[1600px] mx-auto px-6 py-8">
      {/* 🧾 Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold">
            Your Orders
          </h2>
          <p className="text-sm text-gray-500">
            Showing {orders.length} total orders
          </p>
        </div>

        {/* Orders */}
        <div className="flex flex-col gap-6 p-6">
          {paginatedOrders.map((order) => (
            <Order
              key={order.id}
              orderID={order.id}
              orderDate={formatDate(order.created_at)}
              status="Completed"
              amount={formatAmount(order.total_price)}
              image={order.image_path}
              size={order.size}
              frame={order.frame}
              frameType={order.frame_type}
              address={order.address}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50 hover:bg-gray-100 transition"
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-600">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
