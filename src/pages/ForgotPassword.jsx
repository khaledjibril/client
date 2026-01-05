"use strict";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

// ICONS
import { MdLockReset } from "react-icons/md";

// REACT
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResetCode("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://photography-server-catq.onrender.com/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setResetCode(data.resetCode);
      }
    } catch (err) {
      setError("Not reaching, please try again.");
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
                Forgot Password
              </h1>
              <p className="text-muted-foreground text-[1.4rem] mt-3">
                Enter your email to generate a reset code.
              </p>
            </div>

            <div className="p-[2.4rem] pt-0">
              {error && (
                <div className="text-red-600 mb-6 text-center font-medium">
                  {error}
                </div>
              )}

              {/* RESET CODE DISPLAY */}
              {resetCode && (
                <div className="mb-8 text-center border border-border rounded-lg p-6 bg-[#f5f5dc]">
                  <p className="text-sm text-muted-foreground mb-2">
                    Your reset code (expires in 10 minutes)
                  </p>

                  <p className="text-[2.4rem] font-bold tracking-widest">
                    {resetCode}
                  </p>

                  <button
                    onClick={() =>
                      navigate("/reset-password", {
                        state: { email },
                      })
                    }
                    className="mt-6 w-full bg-primary text-white py-4 rounded-md hover:bg-primary/80 transition"
                  >
                    Proceed to Reset Password
                  </button>
                </div>
              )}

              {/* FORM */}
              {!resetCode && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-text-foreground font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-4 text-white bg-primary px-6 py-6 rounded-md w-full hover:bg-primary/80 transition"
                  >
                    <MdLockReset />
                    {loading ? "Generating..." : "Generate Reset Code"}
                  </button>
                </form>
              )}

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

export default ForgotPassword;
