"use strict";

const FormHeader = ({ title, text }) => {
  return (
    <>
      <div class="flex flex-col gap-8 p-[2.4rem] mb-4">
        <h3 class="text-[2.2rem] text-[#504230] capitalize font-semibold leading-5 sm:leading-0">
          {title}
        </h3>
        <p class="text-[1.4rem] text-[#8a775c] leading-5 sm:leading-0">
          {text}
        </p>
      </div>
    </>
  );
};

export default FormHeader;
