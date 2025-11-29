"use client";

import React, { useEffect, useState, useContext } from "react";
import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { AdminContext } from "../../pages/Admin";

const AdminComplaints = () => {
  const { toggleAside } = useContext(AdminContext);

  // State for accordion & complaints
  const [openIndex, setOpenIndex] = useState(null);
  const [complaintsList, setComplaintsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("https://photography-server-catq.onrender.com/api/complaints/all");
        const data = await res.json();
        setComplaintsList(data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  // Filtered complaints based on search
  const filteredComplaints = complaintsList.filter((c) =>
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl shadow-sm">
      {/* Mobile toggle button */}
      <div className="my-10 md:hidden">
        <div className="flex items-center gap-8">
          <button
            onClick={toggleAside}
            type="button"
            className="p-4 border border-border rounded-lg cursor-pointer"
          >
            <IoMdMenu />
          </button>
        </div>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between mr-12">
        <AdminSubHeader
          containerClass="p-12 flex flex-col gap-2 md:mt-8"
          title="All Complaints"
          titleClass="text-4xl font-semibold text-text-foreground"
          text="Review and manage all users submitted complaints."
          textClass="text-muted-foreground text-2xl"
        />
        <SearchBar
          placeholder="Search by user name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-border w-100 sm:w-120 px-14 p-2 md:p-4 md:w-150 md:px-14 rounded-xl"
          continerClass="flex items-center"
          iconClass="w-10 h-10 translate-x-12"
        />
      </div>

      {/* Complaints Table / Accordion */}
      <div className="p-4 pt-0 bg-background-accent rounded-xl">
        <div className="relative w-full overflow-auto">
          {filteredComplaints.map((complaint, index) => (
            <div
              key={complaint.id}
              onClick={() => toggleAccordion(index)}
              className="p-8 flex flex-col gap-12 border-b border-border cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-6">
                  <p className="text-text-foreground">
                    Complaint from: {complaint.full_name} ({complaint.email})
                  </p>
                  <p className="text-muted-foreground">
                    {new Date(complaint.created_at).toLocaleString()}
                  </p>
                </div>
                <p>
                  {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                </p>
              </div>

              {openIndex === index && (
                <div className="transition-all duration-300 ease-in-out">
                  <p className="text-2xl font-semibold text-[#FF5733]">
                    {complaint.complaint}
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredComplaints.length === 0 && (
            <p className="p-8 text-center text-muted-foreground text-2xl">
              No complaints found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaints;
