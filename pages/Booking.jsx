"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SubHeader from "../src/components/SubHeader";
import FormHeader from "../src/components/FormHeader";
import FieldContainer from "../src/components/FieldContainer";
import InputField from "../src/components/InputField";
import Select from "../src/components/Select";
import Address from "../src/components/Address";
import Button from "../src/components/Button";
import PaymentInfo from "../src/components/PaymentInfo";
import Message from "../src/components/Message";

// ICONS
import { FaPaperPlane } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState(
    user?.full_name || user?.fullName || ""
  );
  const [email, setEmail] = useState(user?.email || "");

  // Event type
  const [event, setEvent] = useState("");

  const eventOptions = [
    { value: "", label: "Select the type of event" },
    { value: "Pre-wedding Session", label: "Pre-wedding Session" },
    { value: "Wedding Ceremony", label: "Wedding Ceremony" },
    { value: "Engagement Ceremony", label: "Engagement ceremony" },
    { value: "Birthday Party", label: "Birthday Party" },
    { value: "Naming Ceremony", label: "Naming Ceremony" },
    { value: "Dedication Ceremony", label: "Dedication Ceremony" },
    { value: "Portrait Session", label: "Portrait Session" },
    { value: "Outdoor Photo Session", label: "Outdoor Photo Session" },
    { value: "Corporate Event", label: "Corporate Event" },
    { value: "Family Session", label: "Family Session" },
    { value: "Party / Campaign Event", label: "Party / Campaign Event" },
    { value: "other", label: "Other" },
  ];

  const handleEventChange = (e) => setEvent(e.target.value);

  // Date for min attribute
  const today = new Date().toISOString().split("T")[0];

  // EVENT STATE
  const [eventState, setEventState] = useState("");

  const eventStateOptions = [
    { value: "", label: "Select the event state" },
    { value: "Lagos", label: "Lagos" },
    { value: "Abuja", label: "Abuja" },
    { value: "Rivers", label: "Rivers" },
    { value: "Kano", label: "Kano" },
    { value: "Kaduna", label: "Kaduna" },
    { value: "Oyo", label: "Oyo" },
    { value: "Edo", label: "Edo" },
    { value: "Anambra", label: "Anambra" },
    { value: "Enugu", label: "Enugu" },
    { value: "Delta", label: "Delta" },
    { value: "Imo", label: "Imo" },
    { value: "Other", label: "Other" },
  ];

  // EVENT COUNTRY
  const [eventCountry, setEventCountry] = useState("");

  const eventCountryOptions = [
    { value: "", label: "Select event country" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "other", label: "Other" },
  ];

  // PAYMENT MESSAGE
  // const messageRef = useRef(null);
  // const overlayRef = useRef(null);

  // const displayPaymentInfo = () => {
  //   messageRef.current.classList.remove("hidden");
  //   overlayRef.current.classList.remove("hidden");
  // };

  // const closePaymentInfo = () => {
  //   messageRef.current.classList.add("hidden");
  //   overlayRef.current.classList.add("hidden");
  // };

  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  // EVENT DETAILS
  const [customEvent, setCustomEvent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [otherCountry, setOtherCountry] = useState("");

  // ========================
  // Messages
  // ========================
  const [showMessage, setShowMessage] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageBgColor, setMessageBgColor] = useState("");

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // SUBMIT BOOKING
  const submitBooking = async () => {
    setLoading(true);
    try {
      const payload = {
        full_name: fullName,
        email: email,
        event_type: event === "other" ? "Other" : event,
        custom_event: event === "other" ? customEvent : null,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        country: eventCountry,
        state: eventCountry === "Nigeria" ? eventState : null,
        address: address,
      };

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://photography-server-catq.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // SUCCESS MESSAGE
        setMessageTitle("Success 🎉");
        setMessageContent(
          "Your booking request has been sent successfully, we will get back to you shortly!"
        );
        setMessageBgColor("bg-green-500");
        setShowMessage(true);

        // displayPaymentInfo();
        setShowPaymentInfo(true);
        resetForm(); // Reset form after successful booking

        setTimeout(() => setShowMessage(false), 5000); // Hide after 5 seconds
      } else {
        setMessageTitle("Error 😣");
        setMessageContent(
          data.message || "Booking failed... Please try again."
        );
        setMessageBgColor("bg-red-500");
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 5000); // Hide after 5 seconds
      }
    } catch (err) {
      setMessageTitle("Error");
      setMessageContent(err || "Something went wrong. Please try again.");
      setMessageBgColor("bg-red-500");
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 5000); // Hide after 5 seconds
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setEvent("");
    setEventState("");
    setEventCountry("");
    setCustomEvent("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setAddress("");
    setOtherCountry("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="main-content flex flex-col flex-1" id="top">
        <section className="pt-35">
          <SubHeader
            title={"Book a Photography Session"}
            text={
              "Let's create something beautiful together. Fill out the form below to inquire about our availability."
            }
          />
          <div className="container">
            <form className="bg-background-accent rounded-lg mx-6 shadow-xl border border-border mb-20">
              <FormHeader
                title={"Your Information"}
                text={" All fields are required unless otherwise noted."}
              />

              <div className="p-[2.4rem] pt-0 space-y-6">
                {/* FULL NAME + EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FieldContainer
                    containerClass={"flex flex-col gap-3 mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium"}
                    labelFor={"full-name"}
                    title={"Full Name"}
                    inputField={
                      <InputField
                        type="text"
                        id="full-name"
                        value={fullName}
                        readOnly
                        className="flex border border-border bg-[#e8e8cf] rounded-lg p-4 w-full mt-4 text-gray-500 cursor-not-allowed"
                      />
                    }
                  />

                  <FieldContainer
                    containerClass={"flex flex-col gap-3 mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium"}
                    labelFor={"email"}
                    title={"Email Address"}
                    inputField={
                      <InputField
                        type="email"
                        id="email"
                        value={email}
                        readOnly
                        className="flex border border-border bg-[#e8e8cf] rounded-lg p-4 w-full mt-4 text-gray-500 cursor-not-allowed"
                      />
                    }
                  />
                </div>

                {/* EVENT TYPE */}
                <FieldContainer
                  containerClass={"flex flex-col mb-6"}
                  labelClass={"capitalize text-[#504230] font-medium mb-3"}
                  labelFor={"event-type"}
                  title={"Event type"}
                  inputField={
                    <Select
                      options={eventOptions}
                      value={event}
                      onChange={handleEventChange}
                      className={
                        "w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem] mt-4"
                      }
                    />
                  }
                />

                {/* CUSTOM EVENT TYPE */}
                {event === "other" && (
                  <FieldContainer
                    containerClass={"flex flex-col mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium mb-3"}
                    labelFor={"custom-event"}
                    title={"Custom Event type"}
                    inputField={
                      <InputField
                        type="text"
                        className={
                          "flex border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                        }
                        value={customEvent}
                        onChange={(e) => setCustomEvent(e.target.value)}
                        id="custom-event"
                        placeholder={"e.g., Family Reunion"}
                        required
                      />
                    }
                  />
                )}

                {/* EVENT DATE RANGE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FieldContainer
                    containerClass={"flex flex-col mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium mb-3"}
                    labelFor={"start-date"}
                    title={"Event date: From"}
                    inputField={
                      <InputField
                        type={"date"}
                        className={
                          "flex border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                        }
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        id="start-date"
                        min={today}
                        required
                      />
                    }
                  />

                  <FieldContainer
                    containerClass={"flex flex-col mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium mb-3"}
                    labelFor={"end-date"}
                    title={"To"}
                    inputField={
                      <InputField
                        type={"date"}
                        className={
                          "flex border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                        }
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        id="end-date"
                        min={today}
                        required
                      />
                    }
                  />
                </div>

                {/* EVENT TIME RANGE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FieldContainer
                    containerClass={"flex flex-col mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium mb-3"}
                    labelFor={"start-time"}
                    title={"Event time: start"}
                    inputField={
                      <InputField
                        type={"time"}
                        className={
                          "flex border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                        }
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        id="start-time"
                        min="00:00"
                        max="23:00"
                      />
                    }
                  />

                  <FieldContainer
                    containerClass={"flex flex-col mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium mb-3"}
                    labelFor={"end-time"}
                    title={"end"}
                    inputField={
                      <InputField
                        type={"time"}
                        className={
                          "flex border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                        }
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        id="end-time"
                        min="00:00"
                        max="23:00"
                      />
                    }
                  />
                </div>

                {/* COUNTRY & STATE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FieldContainer
                    containerClass={"flex flex-col mb-6"}
                    labelClass={"capitalize text-[#504230] font-medium mb-3"}
                    labelFor={"country"}
                    title={"Country"}
                    inputField={
                      <Select
                        options={eventCountryOptions}
                        value={eventCountry}
                        onChange={(e) => setEventCountry(e.target.value)}
                        className={
                          "w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem] mt-4"
                        }
                      />
                    }
                  />

                  {eventCountry === "Nigeria" ? (
                    <FieldContainer
                      containerClass={"flex flex-col mb-6"}
                      labelClass={"capitalize text-[#504230] font-medium mb-3"}
                      labelFor={"state"}
                      title={"State"}
                      inputField={
                        <Select
                          options={eventStateOptions}
                          value={eventState}
                          onChange={(e) => setEventState(e.target.value)}
                          className={
                            "w-full rounded-lg border border-border bg-[#f5f5dc] px-4 py-4 text-[1.4rem] mt-4"
                          }
                        />
                      }
                    />
                  ) : (
                    <FieldContainer
                      containerClass={"flex flex-col mb-6"}
                      labelClass={"capitalize text-[#504230] font-medium mb-3"}
                      labelFor={"other-country"}
                      title={"Other Country"}
                      inputField={
                        <InputField
                          type={"text"}
                          className={
                            "flex border border-border bg-[#f5f5dc] rounded-lg p-4 w-full mt-4"
                          }
                          value={otherCountry}
                          onChange={(e) => setOtherCountry(e.target.value)}
                          id="country"
                          placeholder={"Enter your Country and State..."}
                        />
                      }
                    />
                  )}
                </div>

                {/* ADDRESS FIELD */}
                <Address
                  containerClass={"space-y-2 mt-[2.4rem]"}
                  labelClass={
                    "capitalize text-[#504230] font-medium mb-3 leading-5"
                  }
                  title={"event address / location"}
                  htmlFor={"event-address"}
                  textareaClass={
                    "w-full border border-border bg-[#f5f5dc] rounded-lg min-h-[10rem] px-[1rem] py-[1rem] text-[1.4rem] mt-[1rem] placeholder:text-muted-foreground placeholder:leading-6"
                  }
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id={"event-address"}
                  placeholder={"Please provide the full venue and address..."}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex items-center justify-center p-[2.4rem] pt-0">
                <Button
                  type={"button"}
                  disabled={loading}
                  className={
                    "flex items-center justify-center gap-4 capitalize text-white bg-primary px-4 py-4 sm:py-6 w-full rounded-lg cursor-pointer hover:bg-[#b19a76] transition-colors duration-300 ease-in-out leading-6 sm:leading-0"
                  }
                  onClick={submitBooking}
                  text={loading ? "Sending..." : "Send booking request"}
                  icon={<FaPaperPlane />}
                />
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      {/* PAYMENT INFO OVERLAY */}
      <PaymentInfo
        isOpen={showPaymentInfo}
        onClose={() => setShowPaymentInfo(false)}
      />
      {/* UI Messages */}
      <Message
        title={messageTitle}
        message={messageContent}
        backgroundColor={messageBgColor}
        isVisible={showMessage}
      />
    </div>
  );
};

export default Booking;
