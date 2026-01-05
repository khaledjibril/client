"use strict";

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";

// ICONS
import { CiLogin } from "react-icons/ci";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://photography-server-catq.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign in failed");
      } else {
        // Store token
        localStorage.setItem("token", data.token);

        // Update global auth state
        login(
          {
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            isAdmin: data.user.isAdmin,
          },
          data.token
        );

        // Redirect based on role
        if (data.user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="main-content flex flex-col items-center justify-center flex-1 w-full h-full">
        <section className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-200 mx-6 rounded-lg bg-background-accent shadow-xl border border-border">
            <div className="flex flex-col p-[2.4rem] gap-8 text-center my-8">
              <h1 className="capitalize text-text-foreground text-[3rem] font-bold">
                Sign In
              </h1>
              <p className="text-muted-foreground text-[1.4rem] mt-3 leading-6">
                Access your account and order history.
              </p>
              {error && <p className="text-red-500 text-[1rem]">{error}</p>}
            </div>

            <div className="p-[2.4rem] pt-0 w-full">
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {/* Email */}
                <div className="mb-16">
                  <label
                    htmlFor="email"
                    className="capitalize text-text-foreground font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:textmuted-text-muted-foreground"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 mt-[2.4rem] mb-16">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="capitalize text-text-foreground font-medium"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="capitalize text-muted-foreground text-[1.4rem] hover:text-muted-foreground/60 transition-colors duration-300 ease-out"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:textmuted-text-muted-foreground"
                    placeholder="********"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-4 text-white bg-primary px-4 py-6 rounded-md mt-[2.4rem] w-full mb-16 cursor-pointer hover:bg-primary/80 transition-all duration-300 ease-in-out"
                >
                  <CiLogin className="text-[1.6rem]" />
                  Sign In
                </button>
              </form>

              <div className="my-[2.4rem]">
                <div className="flex items-center justify-center">
                  <p className="text-muted-foreground">Or continue with</p>
                </div>

                <div className="flex justify-center items-center mt-16 text-muted-foreground gap-2">
                  <p>Don't have an account?</p>
                  <Link
                    to="/sign-up"
                    className="font-semibold hover:text-muted-foreground/60 transition-colors duration-300 ease-out focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-6"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
