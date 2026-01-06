"use strict";

import { useEffect, useState, useContext } from "react";
import AdminSubHeader from "./AdminSubHeader";
import DownloadBtn from "./DownloadBtn";
import { IoMdMenu } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { AdminContext } from "../pages/Admin";

const AdminOrders = () => {
  const { toggleAside } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://photography-server-catq.onrender.com/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

// inside AdminOrders.jsx
const handleDownload = async (orderId) => {
  try {
    const response = await fetch(
      `https://photography-server-catq.onrender.com/api/orders/${orderId}/download`
    );

    if (!response.ok) throw new Error("Download failed");

    // get the filename from the order ID
    const filename = `order-${orderId}.jpg`;

    // convert response to blob
    const blob = await response.blob();

    // create temporary link to trigger download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // cleanup
    link.remove();
    window.URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error(err);
    alert("Failed to download image");
  }
};


  return (
    <div className="rounded-xl shadow-sm">
      {/* Mobile Toggle */}
      <div className="my-10 md:hidden">
        <button
          onClick={toggleAside}
          className="p-4 border border-border rounded-lg"
        >
          <IoMdMenu />
        </button>
      </div>

      <AdminSubHeader
        containerClass="p-12 leading-12"
        title="All Orders"
        titleClass="text-4xl font-semibold text-text-foreground leading-12"
        text="A complete list of all order items from all users."
        textClass="text-muted-foreground text-2xl"
      />

      <div className="p-4 bg-background-accent overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                User
              </th>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                Email
              </th>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                Order ID
              </th>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                Image
              </th>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                Size
              </th>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                Frame
              </th>
              <th className="text-right h-12 p-8 text-2xl font-medium text-muted-foreground">
                Price
              </th>
              <th className="text-center h-12 p-8 text-2xl font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b text-2xl">
                <td>{order.full_name}</td>
                <td>{order.email}</td>
                <td>tlc-{order.id}</td>

                {/* Image uses Cloudinary URL directly */}
                <td>
                  <div className="w-[6.4rem] h-[6.4rem] rounded-xl overflow-hidden">
                    <img
                      src={order.image_path}
                      alt="Order"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td>{order.size}</td>
                <td>{order.frame === "yes" ? order.frame_type : "No Frame"}</td>
                <td className="text-right">₦{order.total_price.toLocaleString()}</td>

                <td className="text-center">
                  <DownloadBtn
                    text="Download"
                    icon={<GoDownload />}
                    onClick={() => handleDownload(order.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
