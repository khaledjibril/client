"use strict";

import { useEffect, useState, useContext } from "react";
import AdminSubHeader from "./AdminSubHeader";
import SearchBar from "./SearchBar";
import DownloadBtn from "./DownloadBtn";
import { IoMdMenu } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { AdminContext } from "../../pages/Admin";

const AdminOrders = () => {
  const { toggleAside } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://photography-server-catq.onrender.com/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDownload = (orderId) => {
    window.open(
      `https://photography-server-catq.onrender.com/api/orders/${orderId}/download`,
      "_blank"
    );
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
        titleClass={"text-4xl font-semibold text-text-foreground leading-12"}
        text="A complete list of all order items from all users."
        textClass={"text-muted-foreground text-2xl"}
      />

      <div className="p-4 bg-background-accent">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="h-12 p-8 text-left text-2xl font-medium text-muted-foreground">
                User
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
                <td>{order.email}</td>
                <td>tlc-{order.id}</td>

                <td>
                  <div className="w-[6.4rem] h-[6.4rem] rounded-xl overflow-hidden">
                    <img
                      src={`http://localhost:5000${order.image_path}`}
                      alt="Order"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td>{order.size}</td>
                <td>{order.frame === "yes" ? order.frame_type : "No Frame"}</td>
                <td className="text-right">₦{order.total_price}</td>

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
