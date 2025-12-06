"use strict";

// COMPONENTS
import SubHeader from "./SubHeader";

// ICONS
import { CiLogout } from "react-icons/ci";

// REACT
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No user information available.{" "}
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-12 text-text-foreground w-full">
      {/* Header Section */}{" "}
      <div className="flex flex-col gap-6 sm:gap-10">
        {" "}
        <h1 className="text-[1.8rem] sm:text-[2.6rem] font-bold capitalize leading-snug">
          Account Information{" "}
        </h1>{" "}
        <p className="text-muted-foreground text-[1.4rem] sm:text-[1.6rem] leading-relaxed">
          Manage your account details and settings.{" "}
        </p>{" "}
      </div>
      {/* Account Details */}
      <div className="flex flex-col gap-8 sm:gap-12">
        <div className="flex gap-4 items-center">
          <p className="font-bold capitalize text-[1.4rem] sm:text-[1.6rem]">
            Email:
          </p>
          <p className="text-[1.4rem] sm:text-[1.6rem]">{user.email}</p>
        </div>

        <div className="flex gap-4 items-center">
          <p className="font-bold uppercase text-[1.4rem] sm:text-[1.6rem]">
            UID:
          </p>
          <p className="text-[1.4rem] sm:text-[1.6rem]">{user.id}</p>
        </div>

        {/* Sign Out Button */}
        <div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-4 cursor-pointer px-6 py-4 rounded-lg bg-background border border-border hover:bg-tertiary text-text-foreground transition-all duration-300 ease-in capitalize"
          >
            <CiLogout className="text-[1.6rem]" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
