"use static";

// COMPONENTS
import FieldContainer from "./FieldContainer";
import InputField from "./InputField";

// ICONS
import { FaKey } from "react-icons/fa6";

const ResetPassword = () => {
  return (
    <div className="flex flex-col gap-12 sm:gap-18 text-text-foreground">
      <header className="flex flex-col gap-6 sm:gap-10">
        <h1 className="font-bold text-[1.6rem] sm:text-[2.4rem] leading-6">
          Change Your Password
        </h1>
        <p className="text-muted-foreground text-[1.4rem] sm:text-[1.6rem] leading-6">
          Enter your current and new password below.
        </p>
      </header>

      <form className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          {/* CURRENT PASSWORD */}
          <FieldContainer
            containerClass={"flex flex-col gap-3 mb-6"}
            labelClass={"capitalize text-[#504230] font-medium"}
            labelFor={"current-password"}
            title={"Current Password"}
            inputField={
              <InputField
                type="password"
                id="current-password"
                placeholder="Enter your current password"
                className="flex border border-border bg-[#e8e8cf] rounded-lg p-4 w-full mt-4 text-gray-500"
              />
            }
          />
          {/* SET NEW PASSWORD */}
          <FieldContainer
            containerClass={"flex flex-col gap-3 mb-6"}
            labelClass={"capitalize text-[#504230] font-medium"}
            labelFor={"new-password"}
            title={"New Password"}
            inputField={
              <InputField
                type="password"
                id="new-password"
                placeholder="Enter your new password"
                className="flex border border-border bg-[#e8e8cf] rounded-lg p-4 w-full mt-4 text-gray-500"
              />
            }
          />
          {/* CONFIRM PASSWORD */}
          <FieldContainer
            containerClass={"flex flex-col gap-3 mb-6"}
            labelClass={"capitalize text-[#504230] font-medium"}
            labelFor={"confirm-password"}
            title={"Confirm Password"}
            inputField={
              <InputField
                type="password"
                id="confirm-password"
                placeholder="Re-enter your new password"
                className="flex border border-border bg-[#e8e8cf] rounded-lg p-4 w-full mt-4 text-gray-500"
              />
            }
          />
        </div>

        <button
          type="submit"
          className="p-8 text-white rounded-lg flex items-center justify-center gap-4 bg-primary hover:bg-primary/80 transition-all duration-300 leading-6"
        >
          <FaKey /> Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
