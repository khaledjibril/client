"use strict";

import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";

// ICONS
import { IoMdMenu } from "react-icons/io";

import { useContext } from "react";

// getting admin page context
import { AdminContext } from "../../pages/Admin";

import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Roles = () => {
  const { toggleAside } = useContext(AdminContext);
  return (
    <>
      <nav className="w-60 my-8">
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

        <Link to={"../users"} className="flex items-center gap-4 p-4 shadow">
          <FaArrowLeftLong /> Back to Users
        </Link>
      </nav>
      <div className="bg-background-accent drop-shadow-sm">
        <div className="rounded-xl shadow-sm mt-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between mr-12">
            <AdminSubHeader
              containerClass={"p-12 flex flex-col gap-2 md:mt-8"}
              title={"Management User Roles"}
              titleClass={
                "text-4xl font-semibold text-text-foreground capitalize"
              }
              text={"Grant or revoke administrator privilages for users."}
              textClass={"text-muted-foreground text-2xl"}
            />
            <SearchBar
              placeholder={`Search by name or is_Admin...`}
              className={
                "border border-border w-100 sm:w-120 px-14 p-2 md:p-4 md:w-150 md:px-14 rounded-xl"
              }
              continerClass={`flex items-center`}
              iconClass={`w-10 h-10 translate-x-12`}
            />
          </div>
          <div className="p-4 pt-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm ">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b border-border transition-colors hover:bg-background data-[state=selected]:bg-muted">
                    <th className="h-12 p-8 text-left capitalize  text-2xl align-middle font-medium text-muted-foreground">
                      name
                    </th>
                    <th className="h-12 p-8 text-left capitalize text-2xl align-middle font-medium text-muted-foreground">
                      email
                    </th>
                    <th className="h-12 p-8 text-right capitalize  text-2xl align-middle font-medium text-muted-foreground">
                      Grant Admin Access
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                    <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                      Khaled Muhammed
                    </td>
                    <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                      blinq@gmail.com
                    </td>
                    <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                      <AdminPrivilage user={"user1"} />
                    </td>
                  </tr>

                  <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                    <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                      Denis Kunat
                    </td>
                    <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                      denis@gmail.com
                    </td>
                    <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                      <AdminPrivilage user={"user2"} />
                    </td>
                  </tr>
                  <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                    <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                      Rahilat Adams
                    </td>
                    <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                      rehilat@gmail.com
                    </td>
                    <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                      <AdminPrivilage user={"3"} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;

function AdminPrivilage({ user }) {
  return (
    <div className="flex justify-end items-center gap-4">
      <div>
        <input type="radio" name={`${user}admin-privilate`} id="" />
        Yes
      </div>
      <div>
        <input type="radio" name={`${user}admin-privilate`} id="" />
        No
      </div>
    </div>
  );
}