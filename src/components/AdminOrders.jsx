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
    fetch("http://localhost:5000/api/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  const handleDownload = (orderId) => {
    window.open(
      `http://localhost:5000/api/orders/${orderId}/download`,
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
        containerClass="p-12"
        title="All Orders"
        text="A complete list of all order items from all users."
      />

      <div className="p-4 bg-background-accent">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Order ID</th>
              <th>Image</th>
              <th>Size</th>
              <th>Frame</th>
              <th className="text-right">Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
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
