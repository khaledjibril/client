"use strict";

const FormHeader = ({ title, text }) => {
  return (
    <>
      <div class="flex flex-col gap-8 p-[2.4rem] mb-4">
        <h3 class="text-[2.2rem] text-text-foreground capitalize font-semibold leading-5 sm:leading-0">
          {title}
        </h3>
        <p class="text-[1.4rem] text-muted-foreground leading-5 sm:leading-0">
          {text}
        </p>
      </div>
    </>
  );
};

export default FormHeader;
