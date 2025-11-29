import Card from "./Card";
import { ImEnlarge } from "react-icons/im";
import { LuFrame } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const Cards = () => {
  return (
    <div className="grid mx-6 sm:grid-cols-2 md:mx-12 lg:grid-cols-3 gap-16">
      <Card
        title="Photo Enlargement"
        icon={<ImEnlarge />}
        subheading="Bring your favorite photos to life with our premium quality enlargements. Perfect for your home or as a gift."
        text=" Choose from a variety of sizes and professional-grade paper to create a stunning visual piece."
        link={"/order"}
        lintText={"Order a Print"}
        linkIcon={<FaArrowRightLong className="text-[1.6rem]" />}
      />

      <Card
        title={"Customize Framing Sizes"}
        icon={<LuFrame />}
        subheading={
          "Complete your artwork with our selection of high-quality, custom-made frames."
        }
        text={
          "From classic wood to modern metal, find the perfect frame to match your style and decor."
        }
        link={"/order"}
        lintText={"Choose a Frame"}
        linkIcon={<FaArrowRightLong className="text-[1.6rem]" />}
      />

      <Card
        title={"Event Photography"}
        icon={<FaCamera />}
        subheading={
          "Book a professional photographer for your special event. Weddings, birthdays, and more."
        }
        text={
          "We capture the moments that matter, so you can relax and enjoy your day. Let's tell your story."
        }
        link={"/booking"}
        lintText={"Book a Session"}
        linkIcon={<FaArrowRightLong className="text-[1.6rem]" />}
      />
    </div>
  );
};

export default Cards;
