"use strict";

import { useEffect, useState, useContext } from "react";
import axios from "axios";

import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";
import { IoMdMenu } from "react-icons/io";
import { AdminContext } from "../../pages/Admin";

const AdminBookings = () => {
  const { toggleAside } = useContext(AdminContext);
  const [bookings, setBookings] = useState([]);
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Fetch bookings on load
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "https://photography-server-catq.onrender.com/api/admin/bookings"
        );
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="rounded-xl shadow-sm ">
      {/* Mobile Menu */}
      <div className="my-10 md:hidden">
        <button
          onClick={toggleAside}
          type="button"
          className="p-4 border border-border rounded-lg cursor-pointer"
        >
          <IoMdMenu />
        </button>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between mr-12">
        <AdminSubHeader
          containerClass={"p-12 flex flex-col gap-2 md:mt-8"}
          title={"All Bookings"}
          titleClass={"text-4xl font-semibold text-text-foreground"}
          text={`A complete list of all bookings from users.`}
          textClass={"text-muted-foreground text-2xl"}
        />
        <SearchBar
          placeholder={`Search by customer id, event or state...`}
          className={
            "border border-border w-100 sm:w-120 px-14 p-2 md:p-4 md:w-150 md:px-14 rounded-xl"
          }
          continerClass={`flex items-center`}
          iconClass={`w-10 h-10 translate-x-12`}
        />
      </div>

      <div className="p-4 pt-0 bg-background-accent">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr>
                <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                  Customer Email
                </th>
                <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                  Event Type
                </th>
                <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                  Event Date
                </th>
                <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                  Event Time
                </th>
                <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                  Event State
                </th>
                <th className="h-12 p-8 text-right text-2xl font-medium text-muted-foreground">
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border text-2xl hover:bg-background"
                >
                  <td className="p-8">{b.customer_email}</td>
                  <td className="p-8">{b.event_type}</td>
                  <td className="p-8">{formatDate(b.event_date)}</td>
                  {/* Replace with event_startTime and event_endTime */}
                  <td className="p-8">
                    From {b.event_state} - To {b.event_state}
                  </td>
                  <td className="p-8">{b.event_state}</td>
                  <td className="p-8 text-right">{b.address}</td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-10 text-xl">
                    Loading....
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
