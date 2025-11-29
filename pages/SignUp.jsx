"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import { useContext } from "react";


// ICONS
import { IoIosPersonAdd } from "react-icons/io";

// REACT
import { useState } from "react";
        


const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  // STATE
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, phone, email, password, confirmPassword } = formData;

    if (!fullName || !phone || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
const response = await fetch("https://photography-server-catq.onrender.com/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName,
    phone,
    email,
    password,
    confirmPassword,
  }),
});


      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong!");
        setLoading(false);
        return;
      }
    login(
      { id: data.user.id, fullName: data.user.fullName, email: data.user.email },
      data.token
    );

      navigate("/dashboard"); // adjust path as needed
    } catch (err) {
      setError("Network error, try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* MAIN CONTENT */}
      <main
        className="main-content flex flex-col items-center justify-center flex-1 w-full h-full"
        id="top"
      >
        <section className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-200 mx-6 rounded-lg bg-[#f7f7e3] shadow-xl border border-[#ddddb5] my-24">
            <div className="flex flex-col p-[2.4rem] gap-8 text-center my-8">
              <h1 className="capitalize text-[#504230] text-[3rem] font-bold">
                Create an Account
              </h1>
              <p className="text-[#8a775c] text-[1.4rem] mt-3">
                Join our community of photography lovers.
              </p>
            </div>
            <div className="p-[2.4rem] pt-0 w-full">
              {error && (
                <div className="text-red-600 mb-4 text-center font-medium">
                  {error}
                </div>
              )}
              {/* SIGNUP FORM */}
              <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                <div className="mb-16">
                  <label
                    htmlFor="fullName"
                    className="capitalize text-[#504230] font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text[#8a775c]"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2 mt-[2.4rem] mb-16">
                  <label
                    htmlFor="phone"
                    className="capitalize text-[#504230] font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text[#8a775c]"
                    placeholder="e.g., +1 (123) 456 789"
                  />
                </div>

                <div className="space-y-2 mt-[2.4rem] mb-16">
                  <label
                    htmlFor="email"
                    className="capitalize text-[#504230] font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text[#8a775c]"
                    placeholder="e.g., you@example.com"
                  />
                </div>

                <div className="space-y-2 mt-[2.4rem] mb-16">
                  <label
                    htmlFor="password"
                    className="capitalize text-[#504230] font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text[#8a775c]"
                    placeholder="**************"
                  />
                </div>

                <div className="space-y-2 mt-[2.4rem] mb-16">
                  <label
                    htmlFor="confirmPassword"
                    className="capitalize text-[#504230] font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text[#8a775c]"
                    placeholder="Enter password again..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-4 text-white bg-[#a68b64] px[1rem] py-6 rounded-md mt-[2.4rem] w-full mb-16 cursor-pointer hover:bg-[#a68b64]/80 transition-all duration-300 ease-in-out"
                >
                  <IoIosPersonAdd className="text-[1.6rem]" />
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>

              <div className="my-[2.4rem]">
                <div className="flex justify-center items-center mt-16 text-[#8a775c]">
                  <p>Already have an account? </p>
                  <Link
                    to="/sign-in"
                    className="font-semibold hover:text-[#8a775c]/60 transition-colors duration-300 ease-out focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-6"
                  >
                    Sign in
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

export default SignUp;
