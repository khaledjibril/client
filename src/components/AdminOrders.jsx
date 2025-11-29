"use strict";

// COMPONENTS
import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";
import DownloadBtn from "./DownloadBtn";

// ICONS
import { IoMdMenu } from "react-icons/io";

import { useContext } from "react";

// getting admin page context
import { AdminContext } from "../../pages/Admin";

import data from "../assets/pic-resource-url.json";

// ICONS
import { GoDownload } from "react-icons/go";

const AdminOrders = () => {
  const { toggleAside } = useContext(AdminContext);
  const imageFile = data.placeholderImages;
  const image = imageFile[1].imageUrl;
  return (
    <div className="rounded-xl shadow-sm ">
      {/* Mobile Button to toggle aside bar */}
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
          title={"All Orders"}
          titleClass={"text-4xl font-semibold text-text-foreground"}
          text={`A complet list of all order items from all users.`}
          textClass={"text-muted-foreground text-2xl"}
        />
        <SearchBar
          placeholder={`Search by order id...`}
          className={
            "border border-border w-100 sm:w-120 px-14 p-2 md:p-4 md:w-150 md:px-14 rounded-xl"
          }
          continerClass={`flex items-center`}
          iconClass={`w-10 h-10 translate-x-12`}
        />
      </div>
      <div className="p-4 pt-0 bg-background-accent">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm ">
            <thead className="[&_tr]:border-b">
              <tr className="border-b border-border transition-colors hover:bg-background data-[state=selected]:bg-muted">
                <th className="h-12 p-8 text-left capitalize  text-2xl align-middle font-medium text-muted-foreground">
                  User
                </th>
                <th className="h-12 p-8 text-left capitalize  text-2xl align-middle font-medium text-muted-foreground">
                  Order Id
                </th>
                <th className="h-12 p-8 text-left capitalize text-2xl align-middle font-medium text-muted-foreground">
                  Image
                </th>
                <th className="h-12 p-8 text-left capitalize  text-2xl align-middle font-medium text-muted-foreground">
                  Print size
                </th>
                <th className="h-12 p-8 text-left capitalize  text-2xl align-middle font-medium text-muted-foreground">
                  Frame Type
                </th>
                <th className="h-12 p-8 text-right capitalize  text-2xl align-middle font-medium text-muted-foreground">
                  Price
                </th>
                <th className="h-12 p-8 text-center capitalize  text-2xl align-middle font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  rahilat@gmail.com
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  tlc-237eu7df
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  <div className="w-[6.4rem] h-[6.4rem] rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt="Uploaded image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  8x10
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  Black wood
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  ₦75,000
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  <div className="flex justify-center">
                    <DownloadBtn
                      className={`flex items-center gap-4 cursor-pointer border border-border bg-background-accent p-2 font-semibold rounded-lg`}
                      type={"button"}
                      text={"Download"}
                      icon={<GoDownload className="text-3xl" />}
                    />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  denis@gmail.com
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  tlc-689enedm
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  <div className="w-[6.4rem] h-[6.4rem] rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt="Uploaded image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  8x10
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  Natural Oak
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  ₦115,000
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  <div className="flex justify-center">
                    <DownloadBtn
                      className={`flex items-center gap-4 cursor-pointer border border-border bg-background-accent p-2 font-semibold rounded-lg`}
                      type={"button"}
                      text={"Download"}
                      icon={<GoDownload className="text-3xl" />}
                    />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  bling@gmail.com
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  tlc-237eu7df
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  <div className="w-[6.4rem] h-[6.4rem] rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt="Uploaded image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  16x20
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  No Frame
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  ₦82,000
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  <div className="flex justify-center">
                    <DownloadBtn
                      className={`flex items-center gap-4 cursor-pointer border border-border bg-background-accent p-2 font-semibold rounded-lg`}
                      type={"button"}
                      text={"Download"}
                      icon={<GoDownload className="text-3xl" />}
                    />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted">
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  rahilat@gmail.com
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  tlc-237eu7df
                </td>
                <td className="p-8 align-middle text-text-foreground [&:has([role=checkbox])]:pr-0">
                  <div className="w-[6.4rem] h-[6.4rem] rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt="Uploaded image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  8x10
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-left">
                  White Board
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  ₦92,000
                </td>
                <td class="p-8 align-middle text-text-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  <div className="flex justify-center">
                    <DownloadBtn
                      className={`flex items-center gap-4 cursor-pointer border border-border bg-background-accent p-2 font-semibold rounded-lg`}
                      type={"button"}
                      text={"Download"}
                      icon={<GoDownload className="text-3xl" />}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;