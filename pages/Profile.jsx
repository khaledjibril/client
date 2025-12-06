"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import AccountInfo from "../src/components/AccountInfo";
import Orders from "../src/components/Orders";
import Bookings from "../src/components/Bookings";
import Complaint from "../src/components/Complaint";

// REACT
import { useState, useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

// ICONS
import { IoIosPerson } from "react-icons/io";

const Profile = () => {
  // SET AND TRACK ACTIVE ACTION BUTTON
  const [btnActive, setBtnActive] = useState(0);
  const buttonsText = ["Account", "Order", "Booking", "Complaint"];

  // GET USER FROM AUTH CONTEXT
  const { user } = useContext(AuthContext);

  // Dynamic content
  const content = [<AccountInfo />, <Orders />, <Bookings />, <Complaint />];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* MAIN CONTENT */}
      <main className="main-content flex flex-col flex-1" id="top">
        <section className="pt-20 lg:px-[2.4rem] container">
          <div className="flex items-center flex-col gap-8 text-center sm:text-left sm:flex-row sm:gap-4 mx-6">
            <div className="rounded-[50%] w-25 h-25 sm:w-40 sm:h-40 flex items-center justify-center overflow-hidden bg-[#e4e4cc] mr-6">
              <IoIosPerson className="text-[5rem] text-muted-foreground" />
            </div>

            <div className="flex flex-col gap-10">
              <h1 className="text-[1.6rem] sm:text-[2.6rem] text-text-foreground font-bold">
                Welcome,{" "}
                <span className="font-normal">{user?.fullName || "User"}</span>
              </h1>

              <p className="text-muted-foreground leading-6">
                {user?.email || "no-email@example.com"}
              </p>
            </div>
          </div>
        </section>

        <section className="container pt-24 mx-30">
          <div className="grid grid-cols-2 gap-4 sm:gap-0 sm:grid-cols-4 bg-secondary p-4 rounded-xl mb-8 mx-6">
            {buttonsText.map((label, i) => (
              <button
                key={i}
                onClick={() => setBtnActive(i)}
                className={`py-5 px-4 rounded transition ${
                  btnActive === i
                    ? "bg-background text-text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="bg-background-accent py-16 pb-12 px-8 sm:px-12 shadow-md border border-border rounded-xl mx-6">
            {content[btnActive]}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
