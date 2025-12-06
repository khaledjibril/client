"use strict";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SubHeader from "../src/components/SubHeader";
import FormHeader from "../src/components/FormHeader";
import ImageUpload from "../src/components/ImageUpload";
import Select from "../src/components/Select";
import Address from "../src/components/Address";
import Button from "../src/components/Button";
import PaymentInfo from "../src/components/PaymentInfo";

// Icons
import { FaShoppingCart } from "react-icons/fa";

const Order = () => {
  const navigate = useNavigate();

  // ========================================
  // STATES
  // ========================================
  const [selectedSize, setSelectedSize] = useState("");
  const [frame, setFrame] = useState("no");
  const [frameType, setFrameType] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // image preview
  const [addressData, setAddressData] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const messageRef = useRef(null);
  const overlayRef = useRef(null);

  // ========================================
  // SELECT OPTIONS
  // ========================================
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
    { value: "Black wood", label: "Black wood" },
    { value: "White wood", label: "White wood" },
    { value: "Natural oak", label: "Natural oak" },
    { value: "Fabre wood", label: "Fabre wood" },
  ];

  // ========================================
  // HANDLERS
  // ========================================
  const handleSizeChange = (e) => setSelectedSize(e.target.value);
  const handleFrameChange = (e) => setFrame(e.target.value);
  const handleFrameTypeChange = (e) => setFrameType(e.target.value);
  const handleAddressChange = (e) => setAddressData(e.target.value);
  const handleImageSelect = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ========================================
  // PAYMENT MODAL
  // ========================================
  const displayPaymentInfo = () => {
    messageRef.current.classList.remove("hidden");
    overlayRef.current.classList.remove("hidden");
  };

  const closePaymentInfo = () => {
    messageRef.current.classList.add("hidden");
    overlayRef.current.classList.add("hidden");
  };

  // ========================================
  // PLACE ORDER
  // ========================================
  const handlePlaceOrder = async () => {
    if (!image || !selectedSize || !addressData) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("size", selectedSize);
    formData.append("frame", frame);
    formData.append("frameType", frameType);
    formData.append("address", addressData);

    try {
      const res = await fetch(
        "https://photography-server-catq.onrender.com/api/orders",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.order) {
        setTotalPrice(data.order.total_price);
        displayPaymentInfo();
      }
    } catch (error) {
      console.log("ORDER SUBMIT ERROR:", error);
    }
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="main-content flex flex-col flex-1" id="top">
        <section className="pt-35">
          <SubHeader
            title="Create Your Print"
            text="Follow these simple steps to turn your digital photos into stunning physical art."
          />

          <div className="container">
            <form className="bg-background-accent rounded-lg shadow-xl border border-border mb-20 mx-6">
              <FormHeader
                title="Your Order Details"
                text="Upload an image and select your Preferences."
              />

              <div className="p-[2.4rem] pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Image Upload */}
                  <ImageUpload
                    label="1. Upload Image"
                    onFileSelect={handleImageSelect}
                  />
                  {preview && (
                    <div className="mt-4">
                      <p className="text-text-foreground font-medium mb-2">
                        Preview:
                      </p>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-xs rounded-lg border border-gray-300"
                      />
                    </div>
                  )}

                  {/* Order Options */}
                  <div className="space-y-6 pt-2">
                    <div className="flex flex-col gap-3">
                      <label className="capitalize text-text-foreground font-medium">
                        2. choose size
                      </label>
                      <Select
                        options={sizeOptions}
                        value={selectedSize}
                        onChange={handleSizeChange}
                        className="w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem] mt-4"
                      />
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                      <label className="capitalize text-text-foreground font-medium">
                        3. select frame
                      </label>
                      <Select
                        options={frameOptions}
                        value={frame}
                        onChange={handleFrameChange}
                        className="w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem] mt-4"
                      />
                    </div>

                    {frame === "yes" && (
                      <div className="pt-4 flex flex-col gap-3">
                        <label className="capitalize text-text-foreground font-medium">
                          select frame type
                        </label>
                        <Select
                          options={frameTypeOptions}
                          value={frameType}
                          onChange={handleFrameTypeChange}
                          className="w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem] mt-4"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Address
                  containerClass="mt-20 flex flex-col gap-3"
                  labelClass="capitalize text-text-foreground font-medium"
                  title="4. shipping address"
                  textareaClass="w-full border border-border bg-[#f5f5dc] rounded-lg min-h-[10rem] px-[1rem] py-[1rem] text-[1.4rem] mt-[1rem]"
                  placeholder="Enter your full shipping address..."
                  onChange={handleAddressChange}
                />
              </div>

              <div className="flex justify-between items-center p-[2.4rem] bg-[#f5f5dc]/50 mb-8">
                <div className="flex flex-col gap-12">
                  <p className="text-[1.8rem] font-semibold text-text-foreground">
                    total price:
                  </p>
                  <p className="text-[2rem] text-primary font-bold md:text-[3.6rem]">
                    ₦{totalPrice}
                  </p>
                </div>

                <Button
                  className="flex items-center gap-4 text-white bg-primary px-8 py-4 rounded-lg text-[1.6rem] hover:bg-[#af9674]"
                  type="button"
                  text="place order"
                  icon={<FaShoppingCart />}
                  onClick={handlePlaceOrder}
                />
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <PaymentInfo
        msgRef={messageRef}
        overlayRef={overlayRef}
        onClick={closePaymentInfo}
      />
    </div>
  );
};

export default Order;
