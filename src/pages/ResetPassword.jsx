"use strict";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";

// ICONS
import { MdLockReset } from "react-icons/md";

// REACT
import { useState, useEffect } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Prefill email if passed from ForgotPassword
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !resetCode || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://photography-server-catq.onrender.com/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetCode,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setSuccess("Password reset successful. Redirecting...");
        setTimeout(() => navigate("/sign-in"), 1500);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-1 items-center justify-center">
        <section className="w-full flex justify-center">
          <div className="w-200 mx-6 rounded-lg bg-background-accent shadow-xl border border-border">

            <div className="p-[2.4rem] text-center">
              <h1 className="text-[3rem] font-bold text-text-foreground">
                Reset Password
              </h1>
              <p className="text-muted-foreground text-[1.4rem] mt-3">
                Enter the reset code and your new password.
              </p>
            </div>

            <div className="p-[2.4rem] pt-0">
              {error && (
                <div className="text-red-600 mb-6 text-center font-medium">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 mb-6 text-center font-medium">
                  {success}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-text-foreground font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-text-foreground font-medium">
                    Reset Code
                  </label>
                  <input
                    type="text"
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 tracking-widest"
                    placeholder="Enter reset code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-text-foreground font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-text-foreground font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-4 text-white bg-primary px-6 py-6 rounded-md w-full hover:bg-primary/80 transition"
                >
                  <MdLockReset />
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>

              <div className="mt-16 text-center text-muted-foreground">
                <p>
                  Remember your password?
                  <Link
                    to="/sign-in"
                    className="ml-2 font-semibold hover:text-muted-foreground/60"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
