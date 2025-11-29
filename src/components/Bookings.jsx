"use strict";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Booking from "./Booking";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to format time
  const formatTime = (timeStr) => {
    if (!timeStr) return "-";
    const date = new Date(`1970-01-01T${timeStr}Z`);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://photography-server-catq.onrender.com/api/bookings/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  if (loading)
    return <p className="text-center mt-8 text-xl">Loading your bookings...</p>;
  if (!bookings.length)
    return <p className="text-center mt-8 text-xl">No bookings found.</p>;

  return (
    <div className="flex flex-col gap-8 px-4 md:px-12">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="border border-gray-300 rounded-xl p-6 shadow-md bg-white flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-bold text-gray-850">Event:
            {b.event_type || b.custom_event || "Event"}
          </h2>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {formatDate(b.start_date)}{" "}
            - {formatDate(b.end_date)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Time:</span> {formatTime(b.start_time)} -{" "}
            {formatTime(b.end_time)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Address:</span> {b.address || "-"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
