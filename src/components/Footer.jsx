"use strict";
import Logo from "./Logo";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="flex flex-col gap-8 text-center mx-4 items-center justify-between py-12 md:mx-38 md:flex-row">
        <Logo path="#top" />
        <p className="text-lg md:text-xl text-muted-foreground">
          &copy; {year} Neriah Photography. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
