"use strict";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiLockPasswordFill } from "react-icons/ri";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const email = location?.state?.email;

  // If email isn't passed from Verify page, redirect
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://photography-server-catq.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setMessage("Password reset successful! Redirecting...");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      }
    } catch (err) {
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main
        className="main-content flex flex-col items-center justify-center flex-1 w-full h-full"
        id="top"
      >
        <section className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-200 mx-6 rounded-lg bg-background-accent shadow-xl border border-border">
            {/* Header Text */}
            <div className="flex flex-col p-[2.4rem] gap-8 text-center my-8">
              <h1 className="capitalize text-text-foreground text-[3rem] font-bold">
                Reset Password
              </h1>
              <p className="text-muted-foreground text-[1.4rem] mt-3">
                Enter your new password for <strong>{email}</strong>.
              </p>
            </div>

            {/* Form */}
            <div className="p-[2.4rem] pt-0 w-full">
              {error && (
                <div className="text-red-600 mb-4 text-center font-medium">
                  {error}
                </div>
              )}
              {message && (
                <div className="text-green-600 mb-4 text-center font-medium">
                  {message}
                </div>
              )}

              <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="capitalize text-text-foreground font-medium"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text-muted-foreground"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="capitalize text-text-foreground font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text-muted-foreground"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-4 text-white bg-primary px-6 py-6 rounded-md mt-[2.4rem] w-full mb-16 cursor-pointer hover:bg-primary/80 transition-all duration-300 ease-in-out"
                >
                  <RiLockPasswordFill className="text-[1.6rem]" />
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
