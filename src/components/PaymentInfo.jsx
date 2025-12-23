"use strict";

// ICONS

const PaymentInfo = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full ">
        <div className="bg-background rounded-lg p-8 md:max-w-2/3 lg:max-w-1/2 w-4/5 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <p class="text-muted-foreground text-[1.4rem] mt-1 leading-6 sm:leading-0">
            Use the account number for your payment and send a receipt to my
            whatsApp contact
          </p>
          <div className="bg-secondary mt-5 p-8 flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground text-[1.4rem] leading-3 sm:leading-0">
                Account Name:
              </p>
              <p className="text-text-foreground text-[2rem] font-bold leading-5 sm:leading-0">
                Monday Unekwuojo Paul
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground text-[1.4rem] leading-3 sm:leading-0">
                Account Number:
              </p>
              <p className="text-text-foreground text-[2rem] font-bold leading-5 sm:leading-0">
                0292799626
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground text-[1.4rem] leading-3 sm:leading-0">
                Bank Name:
              </p>
              <p className="text-text-foreground text-[2rem] font-bold leading-5 sm:leading-0">
                Wema Bank PLC
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground text-[1.4rem] leading-3 sm:leading-0">
                WhatsApp Contact:
              </p>
              <p className="text-text-foreground text-[2rem] font-bold leading-5 sm:leading-0">
                +234 704 090 6715
              </p>
            </div>
          </div>

          <p className="text-[1.4rem] mb-6 mt-8 leading-6 sm:leading-0">
            Please proceed with payment to complete your request.
          </p>

          <button
            onClick={onClose}
            className="bg-primary text-white px-12 py-6 rounded-lg hover:bg-[#b19a76] transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;
