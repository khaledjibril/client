"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

// ICONS
import { IoMdClose } from "react-icons/io";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useRef, createContext } from "react";

// import { AdminContext } from "../src/context/AdminContext";

export const AdminContext = createContext();
const Admin = () => {
  // to lacate and render path to outlet
  const location = useLocation();

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
      <div className="flex flex-col min-h-screen mx-6">
        <Header />

        <div
          ref={asideParendRef}
          className="flex flex-1 gap-4 w-full h-full group/nav"
        >
          {/* Navigation Aside bar */}
          <aside className="w-2/3 h-full md:h-auto md:w-[25.6rem] border border-border pt-12 absolute top-0 left-0 md:relative -translate-x-full md:translate-x-0 transition-all duration-500 ease-in bg-background opacity-0 pointer-events-none invisible backdrop-blur-sm group-[.nav-open]/nav:opacity-100 group-[.nav-open]/nav:pointer-events-auto group-[.nav-open]/nav:visible group-[.nav-open]/nav:translate-x-0 md:visible md:pointer-events-auto md:opacity-100 z-100">
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
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={i}>
                      <NavLink
                        to={link.path}
                        onClick={handleLinkClick}
                        className={`hover:text-text-foreground text-3xl ${
                          isActive
                            ? "font-semibold text-text-foreground border-l-4 border-text-foreground pl-4"
                            : "hover:text-text-foreground"
                        }`}
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
          <main className="main-content w-full" id="top">
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
