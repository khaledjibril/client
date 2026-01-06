"use strict";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import FormHeader from "../components/FormHeader";
import ImageUpload from "../components/ImageUpload";
import Select from "../components/Select";
import Address from "../components/Address";
import Button from "../components/Button";
import PaymentInfo from "../components/PaymentInfo";
import Message from "../components/Message";
import InputField from "../components/InputField";

// Utils
import { uploadToCloudinary } from "../utils/cloudinary";

// Icons
import { FaShoppingCart } from "react-icons/fa";

const Order = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName] = useState(
    user?.full_name || user?.fullName || ""
  );
  const [email] = useState(user?.email || "");

  // =========================
  // STATE
  // =========================
  const [selectedSize, setSelectedSize] = useState("");
  const [frame, setFrame] = useState("no");
  const [frameType, setFrameType] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState(null);

  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messageRef = useRef(null);
  const overlayRef = useRef(null);

  // =========================
  // OPTIONS
  // =========================
  const sizeOptions = [
    { value: "", label: "Select a print size" },
    { value: "5x7", label: "5 x 7 inches (+₦4,500)" },
    { value: "8x10", label: "8 x 10 inches (+₦8,000)" },
    { value: "10x12", label: "10 x 12 inches (+₦10,500)" },
    { value: "12x15", label: "12 x 15 inches (+₦15,500)" },
    { value: "16x20", label: "16 x 20 inches (+₦20,000)" },
    { value: "16x24", label: "16 x 24 inches (+₦26,200)" },
    { value: "20x24", label: "20 x 24 inches (+₦35,100)" },
    { value: "20x30", label: "20 x 30 inches (+₦55,200)" },
    { value: "24x30", label: "24 x 30 inches (+₦70,200)" },
    { value: "24x35", label: "24 x 35 inches (+₦86,500)" },
    { value: "30x35", label: "30 x 35 inches (+₦120,000)" },
    { value: "35x40", label: "35 x 40 inches (+₦155,000)" },
  ];

  const frameOptions = [
    { value: "no", label: "No frame / frameless" },
    { value: "yes", label: "Frame" },
  ];

  const frameTypeOptions = [
    { value: "", label: "Select frame type" },
    { value: "Black wood", label: "Black wood" },
    { value: "White wood", label: "White wood" },
    { value: "Natural oak", label: "Natural oak" },
    { value: "Fabre wood", label: "Fabre wood" },
  ];

  // =========================
  // IMAGE HANDLER (Cloudinary)
  // =========================
  const handleImageSelect = async (file) => {
    try {
      setLoading(true);
      setError("");

      // instant preview
      setPreview(URL.createObjectURL(file));

      // upload to cloudinary
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LIVE PRICING
  // =========================
  const calculatePrice = async () => {
    if (!selectedSize) {
      setTotalPrice(0);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://photography-server-catq.onrender.com/api/pricing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            size: selectedSize,
            frame,
            frameType: frame === "yes" ? frameType : null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Pricing calculation failed");
      }

      setTotalPrice(data.totalPrice);
    } catch (err) {
      console.error(err);
      setError("Failed to calculate price");
      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedSize, frame, frameType]);

  // ========================
  // UI MESSAGES
  // ========================
  const [showMessage, setShowMessage] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageBgColor, setMessageBgColor] = useState("");

  // =========================
  // PLACE ORDER
  // =========================
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const handlePlaceOrder = async () => {
    if (!imageUrl || !selectedSize || !address) {
      setMessageTitle("Error 😣");
      setMessageContent("Please complete all required fields...");
      setMessageBgColor("bg-red-500");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      return;
    }

    const payload = {
      full_name: fullName,
      email,
      imageUrl,
      size: selectedSize,
      frame,
      frameType: frame === "yes" ? frameType : null,
      address,
    };

    try {
      const response = await fetch(
        "https://photography-server-catq.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      setMessageTitle("Success 🎉");
      setMessageContent("Your order has been placed successfully!");
      setMessageBgColor("bg-green-500");
      setShowMessage(true);

      setShowPaymentInfo(true);
      resetForm();

      setTimeout(() => setShowMessage(false), 5000);
    } catch (error) {
      console.error(error);
      setMessageTitle("Order Failed 😞");
      setMessageContent("Order failed. Please try again...");
      setMessageBgColor("bg-red-500");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setSelectedSize("");
    setFrame("no");
    setFrameType("");
    setImageUrl("");
    setPreview(null);
    setAddress("");
    setTotalPrice(0);
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="pt-35">
          <SubHeader
            title="Create Your Print"
            text="Follow these simple steps to turn your digital photos into stunning physical art."
          />

          <div className="container">
            <form className="mx-6 mb-20 rounded-lg border border-border bg-background-accent shadow-xl">
              <FormHeader
                title="Your Order Details"
                text="Upload an image and select your preferences."
              />

              <div className="p-[2.4rem] pt-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* IMAGE */}
                  <div className="flex flex-col gap-3">
                    <label className="font-medium capitalize text-text-foreground">
                      1. upload image
                    </label>
                    <ImageUpload
                      onFileSelect={handleImageSelect}
                      preview={preview}
                      disabled={loading}
                    />
                  </div>

                  {/* OPTIONS */}
                  <div className="space-y-6 pt-2">
                    <div className="flex flex-col gap-3">
                      <label className="font-medium capitalize text-text-foreground">
                        2. choose size
                      </label>
                      <Select
                        options={sizeOptions}
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="mt-4 w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem]"
                      />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                      <label className="font-medium capitalize text-text-foreground">
                        3. select frame
                      </label>
                      <Select
                        options={frameOptions}
                        value={frame}
                        onChange={(e) => setFrame(e.target.value)}
                        className="mt-4 w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem]"
                      />
                    </div>

                    {frame === "yes" && (
                      <div className="flex flex-col gap-3 pt-4">
                        <label className="font-medium capitalize text-text-foreground">
                          frame type
                        </label>
                        <Select
                          options={frameTypeOptions}
                          value={frameType}
                          onChange={(e) => setFrameType(e.target.value)}
                          className="mt-4 w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Address
                  title="5. shipping address"
                  placeholder="Enter your full shipping address..."
                  onChange={setAddress}
                  containerClass="mt-20 flex flex-col gap-3"
                  labelClass="font-medium capitalize text-text-foreground"
                  textareaClass="mt-4 min-h-[10rem] w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem]"
                />
              </div>

              <div className="mb-8 flex items-center justify-between bg-[#f5f5dc]/50 p-[2.4rem]">
                <span className="text-[2.6rem] font-bold text-primary">
                  {loading ? "Calculating..." : `₦${totalPrice.toLocaleString()}`}
                </span>

                <Button
                  type="button"
                  text="place order"
                  icon={<FaShoppingCart />}
                  onClick={handlePlaceOrder}
                  className="flex items-center gap-4 rounded-lg bg-primary px-8 py-4 text-white hover:bg-[#af9674]"
                />
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <PaymentInfo
        isOpen={showPaymentInfo}
        onClose={() => setShowPaymentInfo(false)}
      />

      <Message
        title={messageTitle}
        message={messageContent}
        backgroundColor={messageBgColor}
        isVisible={showMessage}
      />
    </div>
  );
};

export default Order;
