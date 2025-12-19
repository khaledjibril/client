"use client";

import { useState } from "react";
import FieldContainer from "./FieldContainer";
import InputField from "./InputField";
import { FaKey } from "react-icons/fa6";

const ResetPassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/auth/change-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword
          })
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess("Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 text-text-foreground">
      <header className="flex flex-col gap-6">
        <h1 className="font-bold text-[2.4rem]">Change Your Password</h1>
        <p className="text-muted-foreground">
          Enter your current and new password below.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <FieldContainer
          title="Current Password"
          inputField={
            <InputField
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
            />
          }
        />

        <FieldContainer
          title="New Password"
          inputField={
            <InputField
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
            />
          }
        />

        <FieldContainer
          title="Confirm Password"
          inputField={
            <InputField
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your new password"
            />
          }
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          disabled={loading}
          type="submit"
          className="p-8 text-white rounded-lg flex items-center justify-center gap-4 bg-primary disabled:opacity-60"
        >
          <FaKey />
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
