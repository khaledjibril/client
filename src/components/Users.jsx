"use strict";

import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";
import { IoMdMenu } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../pages/Admin";
import { Link } from "react-router-dom";

const Users = () => {
  const { toggleAside } = useContext(AdminContext);

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://photography-server-catq.onrender.com/api/users");
        const data = await res.json();
        setUsers(data);
        setFiltered(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users dynamically
  useEffect(() => {
    const keyword = search.toLowerCase();

    const results = users.filter((user) => {
      const nameMatch = user.full_name?.toLowerCase().includes(keyword);
      const emailMatch = user.email?.toLowerCase().includes(keyword);
      const adminMatch =
        (user.is_admin ? "true" : "false").includes(keyword);

      return nameMatch || emailMatch || adminMatch;
    });

    setFiltered(results);
  }, [search, users]);

  return (
    <div className="rounded-xl shadow-sm">
      {/* Mobile Button */}
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

      <div className="flex flex-col-reverse md:flex-row items-center justify-between mr-12">
        <AdminSubHeader
          containerClass={"p-12 flex flex-col gap-2 md:mt-8"}
          title={"User Management"}
          titleClass={"text-4xl font-semibold text-text-foreground"}
          text={
            <p className="flex gap-1.5 items-center">
              View all users and
              <Link to={"roles"} className="underline">
                manage their roles.
              </Link>
            </p>
          }
          textClass={"text-muted-foreground text-2xl"}
        />

        <SearchBar
          placeholder={`Search by name, email, or admin status...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              <tr className="border-b border-border transition-colors hover:bg-background">
                <th className="h-12 p-8 text-left capitalize text-2xl font-medium text-muted-foreground">
                  name
                </th>
                <th className="h-12 p-8 text-left capitalize text-2xl font-medium text-muted-foreground">
                  email
                </th>
                <th className="h-12 p-8 text-right capitalize text-2xl font-medium text-muted-foreground">
                  is admin
                </th>
              </tr>
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border text-2xl transition-colors hover:bg-background"
                >
                  <td className="p-8 text-text-foreground">
                    {user.full_name}
                  </td>
                  <td className="p-8 text-text-foreground">
                    {user.email}  
                  </td>
                  <td className="p-8 text-right text-text-foreground">
                    {user.is_admin ? "True" : "False"}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="p-8 text-center text-xl text-muted-foreground"
                  >
                    No users found.
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

export default Users;
