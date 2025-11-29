"use strict";

import { CiLogin } from "react-icons/ci";
import { IoIosPersonAdd, IoIosPerson } from "react-icons/io";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { CiLogout, CiCamera } from "react-icons/ci";

import Logo from "./Logo";
import Button from "./Button";
import ProfileBox from "./ProfileBox";

import { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Detect admin
  const isAdmin = user?.isAdmin === true;

  // MOBILE NAV
  const headerRef = useRef(null);
  const toggleMobileMenu = () => {
    headerRef.current.classList.toggle("nav-open");
  };

  // PROFILE DROPDOWN
  const profileComponentRef = useRef(null);
  const handleProfileButton = () => {
    profileComponentRef.current.classList.toggle("hidden");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      ref={headerRef}
      className="main-header h-28 px-4 lg:px-16 group/nav flex items-center justify-between gap-[2.4rem] bg-[#f5f5db] sticky top-0 z-50 w-full shadow-sm"
    >
      <Logo path="/" />

      {/* MOBILE NAV BUTTON */}
      <button
        className="text-[2.6rem] lg:hidden text-[#504230]"
        onClick={toggleMobileMenu}
      >
        <IoMdMenu />
      </button>

      {/* MAIN NAV WRAPPER */}
      <nav className="maim-nav flex flex-col items-center pt-40 absolute top-0 right-0 w-full gap-20 translate-x-full h-dvh px-8 transition-all duration-500 ease-in bg-[#f5f5db] opacity-0 pointer-events-none invisible backdrop-blur-sm group-[.nav-open]/nav:opacity-100 group-[.nav-open]/nav:pointer-events-auto group-[.nav-open]/nav:visible group-[.nav-open]/nav:translate-x-0 lg:visible lg:pointer-events-auto lg:opacity-100 lg:pt-0 lg:p-0 lg:h-auto lg:translate-x-0 lg:w-auto lg:gap-20 lg:flex lg:flex-row lg:items-center lg:justify-between lg:relative z-10"
      >
        {/* MOBILE CLOSE BUTTON */}
        <button
          onClick={toggleMobileMenu}
          className="absolute top-10 right-8 lg:hidden text-[3rem] text-[#504230]"
        >
          <IoMdClose />
        </button>

        {/* MOBILE LOGO */}
        <Link
          to="/index"
          className="flex items-center gap-3 text-[#504230] tracking-wide font-bold text-[1.6rem] capitalize lg:hidden"
        >
          <CiCamera className="text-[#8a775c] text-[2.6rem]" />
          Neriah Photography
        </Link>

        {/* NAV LINKS */}
        <nav className="flex gap-10 items-center">
          <ul className="flex flex-col text-center gap-12 text-[1.8rem] text-[#8a775c] font-medium lg:flex-row lg:gap-8 lg:text-[1.4rem]">

            {/* Always visible */}
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>

            {/* Customer pages: show ONLY if NOT admin */}
            {!isAdmin && (
              <>
                <li><Link to="/order">Order a Print</Link></li>
                <li><Link to="/booking">Book a Session</Link></li>
              </>
            )}

            {/* Admin page: show ONLY for admin */}
            {isAdmin && (
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* AUTH SECTION */}
        <nav className="flex items-center text-[#8a775c]">

          {/* NOT LOGGED IN */}
          {!user && (
            <ul className="flex flex-col gap-8 items-center text-[1.8rem] font-medium lg:flex-row lg:text-[1.4rem] lg:gap-4">
              <li>
                <Link
                  to="/sign-in"
                  className="flex items-center gap-6 text-[#504230] px-6 py-4 rounded-lg hover:bg-[#bdb76b] transition-colors duration-500 ease-in-out"
                >
                  <CiLogin className="text-[1.6rem]" />
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/sign-up"
                  className="flex items-center gap-6 bg-[#9c7f5c] text-[#f6f4ee] px-6 py-4 rounded-lg hover:bg-[#af9674] transition-colors duration-500 ease-in-out"
                >
                  <IoIosPersonAdd className="text-[1.6rem]" />
                  Sign Up
                </Link>
              </li>
            </ul>
          )}

          {/* LOGGED IN */}
          {user && (
            <ul className="relative flex items-center">
              <li>
                <Button
                  className="flex items-center gap-6 text-[#9c7f5c] bg-[#e4e4cc] px-6 py-6 rounded-[50%] hover:bg-[#e4e4cc]/40 transition-colors duration-500 ease-in-out cursor-pointer"
                  icon={<IoIosPerson />}
                  onClick={handleProfileButton}
                />

                <ProfileBox
                  title={user.fullName}
                  email={user.email}
                  icon={<CiLogout />}
                  text="Log out"
                  onLogout={handleLogout}
                  ref={profileComponentRef}
                />
              </li>
            </ul>
          )}
        </nav>
      </nav>
    </header>
  );
};

export default Header;
