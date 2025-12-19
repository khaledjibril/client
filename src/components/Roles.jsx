"use client";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";
import AdminPrivilege from "./AdminPrivilege";
import { AdminContext } from "../../pages/Admin";


const Roles = () => {
  const { toggleAside } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateUserRole = (id, isAdmin) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, is_admin: isAdmin } : user
      )
    );
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="w-60 my-8">
        <div className="my-10 md:hidden">
          <button
            onClick={toggleAside}
            className="p-4 border rounded-lg"
          >
            <IoMdMenu />
          </button>
        </div>

        <Link to="../users" className="flex items-center gap-4 p-4 shadow">
          <FaArrowLeftLong /> Back to Users
        </Link>
      </nav>

      <div className="bg-background-accent shadow-sm rounded-xl mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <AdminSubHeader
            title="Management User Roles"
            text="Grant or revoke administrator privileges for users."
          />

          <SearchBar
            placeholder="Search by name or email..."
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="p-8 overflow-auto">
          <table className="w-full text-2xl">
            <thead>
              <tr className="border-b">
                <th className="p-6 text-left">Name</th>
                <th className="p-6 text-left">Email</th>
                <th className="p-6 text-right">Admin Access</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-muted">
                  <td className="p-6">{user.full_name}</td>
                  <td className="p-6">{user.email}</td>
                  <td className="p-6 text-right">
                    <AdminPrivilege
                      user={user}
                      onUpdate={updateUserRole}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Roles;
