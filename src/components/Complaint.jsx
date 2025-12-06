import React, { useState } from "react";

const Complaint = () => {
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaint.trim()) {
      setMessage("Complaint cannot be empty.");
      return;
    }

    try {
      const res = await fetch(
        "https://photography-server-catq.onrender.com/api/complaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ complaint }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Complaint submitted successfully!");
        setComplaint("");
      } else {
        setMessage(data.message || "Error submitting complaint");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-18 text-text-foreground">
      <header className="flex flex-col gap-6 sm:gap-10">
        <h1 className="font-bold text-[1.6rem] sm:text-[2.4rem] leading-6">
          Submit a Complaint
        </h1>
        <p className="text-muted-foreground text-[1.4rem] sm:text-[1.6rem] leading-6">
          We are sorry for any inconvenience. Please let us know what went
          wrong.
        </p>
      </header>

      {message && (
        <p className="text-[1.4rem] bg-yellow-100 p-4 rounded-5g">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="complaint"
            className="text-[1.6rem] font-medium leading-6"
          >
            Complaint Details
          </label>

          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="w-full border border-border bg-[#f5f5dc] rounded-lg min-h-50 px-4 py-4 text-[1.4rem] mt-4 placeholder:leading-6"
            placeholder="Please describe the issue in detail..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="p-8 text-white rounded-lg bg-primary hover:bg-primary/80 transition-all duration-300 leading-6"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default Complaint;
