"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";

// REACT
import { useState, useEffect } from "react";

// ICONS
import { MdVerified } from "react-icons/md";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) {
      // If user accessed page directly without state, redirect back to forgot-password
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !code) {
      setError("Email and code are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://photography-server-catq.onrender.com/api/auth/verify-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid code or email!");
      } else {
        setMessage(data.message || "Code verified! Redirecting...");
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
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

      <main className="main-content flex flex-col items-center justify-center flex-1 w-full h-full" id="top">
        <section className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-200 mx-6 rounded-lg bg-[#f7f7e3] shadow-xl border border-[#ddddb5]">
            <div className="flex flex-col p-[2.4rem] gap-8 text-center my-8">
              <h1 className="capitalize text-[#504230] text-[3rem] font-bold">
                Verify Reset Code
              </h1>
              <p className="text-[#8a775c] text-[1.4rem] mt-3">
                Enter the 6-digit code sent to your email.
              </p>
            </div>

            <div className="p-[2.4rem] pt-0 w-full">
              {error && <div className="text-red-600 mb-4 text-center font-medium">{error}</div>}
              {message && <div className="text-green-600 mb-4 text-center font-medium">{message}</div>}

              <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="capitalize text-[#504230] font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text-[#8a775c]"
                    value={email}
                    readOnly
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="code" className="capitalize text-[#504230] font-medium">
                    Reset Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    className="flex text-[1.4rem] border border-[#ddddb5] bg-[#f5f5dc] rounded-lg p-4 w-full mt-4 placeholder:text-[#8a775c]"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-4 text-white bg-[#a68b64] px-6 py-6 rounded-md mt-[2.4rem] w-full mb-16 cursor-pointer hover:bg-[#a68b64]/80 transition-all duration-300 ease-in-out"
                >
                  <MdVerified className="text-[1.6rem]" />
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
              </form>

              <div className="my-[2.4rem] text-center text-[#8a775c]">
                <p>
                  Didn't receive a code? <Link to="/forgot-password" className="font-semibold hover:text-[#8a775c]/60">Resend</Link>
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

export default VerifyCode;
