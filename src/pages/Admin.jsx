"use strict";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";

// ICONS
import { IoMdClose } from "react-icons/io";

import { NavLink, Outlet } from "react-router-dom";
import { useRef, createContext } from "react";

// import { AdminContext } from "../context/AdminContext";

export const AdminContext = createContext();
const Admin = () => {
  // Aside Link text and path
  const linksObjects = [
    { text: "Dashboard", path: "/admin" },
    { text: "Users", path: "users" },
    { text: "Orders", path: "orders" },
    { text: "Bookings", path: "bookings" },
    { text: "Complaints", path: "complaints" },
  ];

  // use ref to enable use to target element
  const asideParendRef = useRef(null);

  const toggleAside = () => {
    if (asideParendRef.current) {
      asideParendRef.current.classList.toggle("nav-open");
    }
  };

  // Close sidebar when a link is clicked (mobile only)
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && asideParendRef.current) {
      asideParendRef.current.classList.remove("nav-open");
    }
  };

  return (
    <AdminContext.Provider value={{ toggleAside }}>
      <div className="flex flex-col min-h-screen mx-6 overflow-hidden">
        <Header />

        <div
          ref={asideParendRef}
          // className="flex flex-1 gap-4 w-full h-full group/nav"
          className="grid grid-cols-1 md:grid-cols-[25.6rem_1fr] flex-1 w-full h-full group/nav"
        >
          {/* Navigation Aside bar */}
          <aside
            className="
    fixed md:sticky
    top-0 left-0
    w-2/3 md:w-[25.6rem]
    h-screen
    border border-border
    pt-12
    bg-background
    z-50
    -translate-x-full md:translate-x-0
    transition-all duration-500 ease-in
    opacity-0 md:opacity-100
    invisible md:visible
    pointer-events-none md:pointer-events-auto

    group-[.nav-open]/nav:translate-x-0
    group-[.nav-open]/nav:opacity-100
    group-[.nav-open]/nav:visible
    group-[.nav-open]/nav:pointer-events-auto
  "
          >
            <div className="flex justify-end w-full md:hiddedn">
              <button
                className="p-4 border-2 border-muted-foreground rounded-lg cursor-pointer mx-4 font-bold md:hidden"
                onClick={toggleAside}
              >
                <IoMdClose className="" />
              </button>
            </div>
            <h1 className="text-4xl font-bold text-center my-8 mb-12 md:hidden">
              Admin Menu
            </h1>
            <nav>
              <ul className="flex flex-col gap-12 mx-8 text-text-foreground">
                {/* iterating throuth the linkObjects to display the list text, path and handle state */}
                {linksObjects.map((link, i) => {
                  return (
                    <li key={i}>
                      <NavLink
                        to={link.path}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          `text-3xl transition-all ${
                            isActive
                              ? "font-semibold border-l-4 border-text-foreground pl-4"
                              : "hover:pl-4 hover:border-l-4 hover:border-muted-foreground"
                          }`
                        }
                        end={link.path === "/admin"}
                      >
                        {link.text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
          {/* MAIN CONTENT */}
          <main
            className="main-content w-full h-screen overflow-y-auto"
            id="top"
          >
            {/* outlet for aside bar links component to be rendered dynamically on the page on click */}
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </AdminContext.Provider>
  );
};

export default Admin;
