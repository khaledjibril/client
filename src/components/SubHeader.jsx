const SubHeader = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center gap-6 sm:gap-12 text-center mb-20 m:mx-[3rem]">
      <header>
        <h2 className="text-text-foreground text-[3rem] font-bold tracking-tight md:text-[4.8rem] leading-10 sm:leading-0">
          {title}
        </h2>
      </header>
      <p className="text-[1.6rem] text-muted-foreground leading-normal mx-6 md:mx-12 md:text-[2rem]">
        {text}
      </p>
    </div>
  );
};

export default SubHeader;
