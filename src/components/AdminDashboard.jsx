"use strict";

import { useEffect, useState, useContext } from "react";
import axios from "axios";

// Components
import AdminSubHeader from "./AdminSubHeader";
import OverviewCard from "./OverviewCard";
import FieldContainer from "./FieldContainer";
import InputField from "./InputField";
import ImageUpload from "./ImageUpload";
import Button from "./Button";

// ICONS
import { IoMdPeople, IoMdMenu } from "react-icons/io";
import { FaShoppingCart, FaCalendar } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";

// Admin context
import { AdminContext } from "../pages/Admin";

const AdminDashboard = () => {
  const { toggleAside } = useContext(AdminContext);

  // States
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalBookings: 0,
    pendingComplaints: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, usersRes, ordersRes, complaintsRes] =
          await Promise.all([
            axios.get(
              "https://photography-server-catq.onrender.com/api/admin/stats"
            ),
            axios.get(
              "https://photography-server-catq.onrender.com/api/admin/recent-users"
            ),
            axios.get(
              "https://photography-server-catq.onrender.com/api/admin/recent-orders"
            ),
            axios.get(
              "https://photography-server-catq.onrender.com/api/complaints/all"
            ),
          ]);

        // Set basic stats
        setStats(
          statsRes.data || {
            totalUsers: 0,
            totalOrders: 0,
            totalBookings: 0,
            pendingComplaints: 0,
          }
        );

        // ---- FIXED: calculate pending complaints ----
        let pending = 0;
        if (Array.isArray(complaintsRes.data)) {
          pending = complaintsRes.data.filter(
            (c) => c.status === "pending"
          ).length;
        }

        setStats((prev) => ({
          ...prev,
          pendingComplaints: pending,
        }));
        // ---------------------------------------------

        // Recent users
        if (Array.isArray(usersRes.data)) setRecentUsers(usersRes.data);
        else if (Array.isArray(usersRes.data.users))
          setRecentUsers(usersRes.data.users);
        else setRecentUsers([]);

        // Recent orders
        if (Array.isArray(ordersRes.data)) setRecentOrders(ordersRes.data);
        else if (Array.isArray(ordersRes.data.orders))
          setRecentOrders(ordersRes.data.orders);
        else setRecentOrders([]);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setRecentUsers([]);
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Handle gallery input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file")
      setGalleryForm((prev) => ({ ...prev, file: files[0] }));
    else setGalleryForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit gallery
  const handleUpload = async () => {
    if (!galleryForm.title || !galleryForm.description || !galleryForm.file) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", galleryForm.title);
    formData.append("description", galleryForm.description);
    formData.append("file", galleryForm.file);

    try {
      await axios.post(
        "https://photography-server-catq.onrender.com/api/admin/gallery",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Image uploaded successfully!");
      setGalleryForm({ title: "", description: "", file: null });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed!");
    }
  };

  if (loading)
    return <p className="text-center text-2xl mt-12">Loading dashboard...</p>;

  return (
    <div>
      {/* Header */}
      <AdminSubHeader
        containerClass={"flex-col gap-10 pt-16 hidden md:flex md:ml-12"}
        title={`Admin Dashboard`}
        titleClass={`font-bold text-[2.8rem] text-text-foreground capitalize`}
        text={`Overview of your application.`}
        textClass={`text-muted-foreground`}
      />

      <div className="mt-12 md:hidden">
        <div className="flex items-center gap-8">
          <button
            onClick={toggleAside}
            type="button"
            className="p-4 border border-border rounded-lg cursor-pointer"
          >
            <IoMdMenu />
          </button>
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid gap-12 mt-16 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title={"Total Users"}
          icon={<IoMdPeople />}
          number={stats.totalUsers}
        />
        <OverviewCard
          title={"Total Orders"}
          icon={<FaShoppingCart />}
          number={stats.totalOrders}
        />
        <OverviewCard
          title={"Total Bookings"}
          icon={<FaCalendar />}
          number={stats.totalBookings}
        />
        <OverviewCard
          title={"Pending Complaints"}
          icon={<BiSolidComment />}
          number={stats.pendingComplaints}
        />
      </div>

      {/* Image upload */}
      <div className="rounded-lg border border-border bg-background-accent shadow-sm my-8">
        <AdminSubHeader
          title={"Upload New Gallery Image"}
          text={"Add a new image to the main gallery page."}
          containerClass={"flex-col gap-10 pt-16 hidden md:flex mx-16 my-4"}
          titleClass={`font-bold text-[2.8rem] text-text-foreground capitalize`}
          textClass={`text-muted-foreground`}
        />
        <div className="p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <FieldContainer
              containerClass={"flex flex-col gap-3 mb-16"}
              labelClass={"capitalize text-text-foreground font-medium"}
              labelFor={"image-upload"}
              title={"Image Title"}
              inputField={
                <InputField
                  type={"text"}
                  id="title"
                  name="title"
                  value={galleryForm.title}
                  onChange={handleChange}
                  className={
                    "flex border border-border bg-background rounded-lg p-4 w-full mt-4 placeholder:text-text-foreground placeholder:text-[1.4rem]"
                  }
                  placeholder={"e.g., Beautiful Sunset in Lagos"}
                  required
                />
              }
            />
            <div className="flex flex-col gap-3 mb-6">
              <label htmlFor="description" className="text-text-foreground">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={galleryForm.description}
                onChange={handleChange}
                className="w-full border border-border bg-background rounded-lg min-h-30 px-4 py-4 text-[1.4rem] mt-4 placeholder:text-text-foreground placeholder:leading-7 sm:placeholder:leading-0"
                placeholder="A short, captivating description of the image."
                rows={4}
              ></textarea>
            </div>
          </div>

          <ImageUpload
            label={"Image File"}
            onChange={handleChange}
            name="file"
          />
        </div>

        <div className="flex items-center justify-center px-10 md:mx-16">
          <Button
            icon={<MdOutlineFileUpload className="text-4xl" />}
            className={
              "w-full bg-primary hover:bg-primary/80 rounded-lg py-6 mt-8 flex items-center justify-center gap-4 text-white text-[1.6rem] cursor-pointer transition-all duration-300 ease-in-out my-16"
            }
            text={"Add to Gallery"}
            onClick={handleUpload}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="grid gap-12 md:grid-cols-2 mt-12">
        <div className="bg-background-accent drop-shadow-sm p-10 rounded-xl flex flex-col gap-12">
          <AdminSubHeader
            containerClass={"flex flex-col gap-2"}
            title={"Recent Orders"}
            titleClass={
              "text-4xl font-semibold text-text-foreground capitalize"
            }
            text={"A list of the most recent orders."}
            textClass={"text-2xl text-muted-foreground"}
          />
          <div className="p-4 pt-0 overflow-x-auto">
            <div className="relative w-full overflow-x-auto md:overflow-x-visible overflow-y-hidden scroll-smooth">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b border-border transition-colors hover:bg-background data-[state=selected]:bg-muted">
                    <th className="h-12 p-8 text-left capitalize text-2xl align-middle font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="h-12 p-8 text-left capitalize text-2xl align-middle font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="h-12 p-8 text-right capitalize text-2xl align-middle font-medium text-muted-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {Array.isArray(recentOrders) && recentOrders.length > 0 ? (
                    recentOrders.map((order, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border transition-colors text-2xl hover:bg-background data-[state=selected]:bg-muted"
                      >
                        <td className="p-8 align-middle text-text-foreground">
                          {order.full_name || "-"}
                        </td>
                        <td className="p-8 align-middle text-text-foreground">
                          <div className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xl font-semibold capitalize">
                            {order.status || "-"}
                          </div>
                        </td>
                        <td className="p-8 align-middle text-text-foreground text-right">
                          ₦{order.amount?.toLocaleString() || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-background-accent drop-shadow-sm p-10 rounded-xl">
          <AdminSubHeader
            containerClass={"flex flex-col gap-2"}
            title={"Recent Users"}
            titleClass={
              "text-4xl font-semibold text-text-foreground capitalize"
            }
            text={"The latest users who signed up."}
            textClass={"text-2xl text-muted-foreground"}
          />
          <div className="py-12">
            {Array.isArray(recentUsers) && recentUsers.length > 0 ? (
              recentUsers.map((user, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-8 not-last:pb-10"
                >
                  <div className="w-16 h-16 rounded-[50%] bg-background-accent flex items-center justify-center">
                    <span className="capitalize">{user.name?.[0] || "?"}</span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="text-text-foreground text-[1.6rem] font-semibold capitalize">
                      {user.name || "-"}
                    </p>
                    <p className="text-muted-foreground text-[1.4rem] leading-2">
                      {user.email || "-"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No recent users found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
