"use strict";
import Overlay from "./Overlay";

// ICONS
import { IoMdClose } from "react-icons/io";

const PaymentInfo = ({ msgRef, overlayRef, onClick }) => {
  return (
    <>
      <div
        ref={msgRef}
        className="payment-info hidden absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-4/5 md:w-2/3 lg:w-1/2 rounded-2xl shadow-md z-10 bg-[#f5f5dc] p-8"
      >
        <div className="flex items-center justify-between">
          <p className="text-[#504230 text-[2rem] font-bold leading-7 sm:leading-0">
            Payment Information
          </p>
          <button
            onClick={onClick}
            type="button"
            className="btn-close-payment-info p-4 border border-[#a68b64] rounded-lg cursor-pointer"
          >
            <IoMdClose className="text-[#a68b64]" />
          </button>
        </div>
        <p class="text-[#8a775c] text-[1.4rem] mt-1 leading-5 sm:leading-0">
          Use the account number for your payment and send a receipt to my
          whatsApp contact
        </p>
        <div className="bg-[#ededd4] mt-5 p-8 flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <p className="text-[#8a775c] text-[1.4rem] leading-3 sm:leading-0">
              Account Number:
            </p>
            <p className="text-[#504230] text-[2rem] font-bold leading-5 sm:leading-0">
              123-456-7890
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[#8a775c] text-[1.4rem] leading-3 sm:leading-0">
              WhatsApp Contact:
            </p>
            <p className="text-[#504230] text-[2rem] font-bold leading-5 sm:leading-0">
              +234 708 052 5117
            </p>
          </div>
        </div>
      </div>
      <Overlay ref={overlayRef} />
    </>
  );
};

export default PaymentInfo;
