"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SubHeader from "../src/components/SubHeader";
import Cards from "../src/components/Cards";
import Image from "../src/components/Image";

import data from "../src/assets/pic-resource-url.json";
import { Link } from "react-router-dom";

// ICONS
import { FaArrowRightLong } from "react-icons/fa6";

const Index = () => {
  // Get the hero image from the data
  const images = data.placeholderImages;
  const heroImage = images.find((img) => img.id === "hero");

  const galleryImages = images.filter((img) =>
    ["gallery-1", "gallery-2", "gallery-3", "gallery-4"].includes(img.id)
  );
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="main-content flex flex-col flex-1" id="top">
        <section
          className="hero bg-cover bg-center bg-no-repeat h-260 flex flex-col items-center justify-center text-center px-4 mb-48"
          style={{
            backgroundImage: `
            linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1)),
            url(${heroImage.imageUrl})`,
          }}
        >
          <div className="hero-content text-white flex flex-col gap-10 lg:gap-20 mt-110">
            <header>
              <h1 className="font-bold capitalize text-[3.6rem] md:text-[4.8rem] lg:text-[6.8rem] leading-15">
                Neriah Photography
              </h1>
            </header>
            <p className="text-[1.6rem] max-w-280 mx-auto leading-[1.4] md:text-[2rem]">
              Transforming your memories into timeless art. High-quality
              enlargements and professional photography.
            </p>
            <div className="flex items-center justify-center mt-8">
              <Link
                to="/gallery"
                className="flex items-center gap-8 text-[1.4rem] text-[#504230] bg-[#bdb76b] rounded-lg px-12 py-8 cursor-pointer hover:bg-[#a6a266] transition-colors duration-300 ease-in-out capitalize font-medium"
              >
                Explore the Gallery
                <FaArrowRightLong className="text-[1.6rem]" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION SERVICES */}
        <section className="mb-40">
          <div className="container mx-auto px-[2.4rem]">
            <SubHeader
              title="Our Services"
              text="From stunning prints to professional photoshoots, we offer
                everything you need to capture and preserve your most precious
                moments."
            />
            <Cards />
          </div>
        </section>

        {/* SECTION FROM PORTFOLIO */}
        <section className="bg-[#ededd4] py-48">
          <SubHeader
            title="From Our Portfolio"
            text="A glimpse into the stories we've had the honor of capturing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:mx-8 lg:grid-cols-4 lg:mx-40 gap-4 md:gap-6 mt-12 mx-6">
            {galleryImages.map((img) => (
              <div key={img.id} className="h-177 overflow-hidden rounded-xl">
                <Image
                  src={img.imageUrl}
                  alt={img.description}
                  loading={"lazy"}
                  className={
                    "w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                  }
                />
              </div>
            ))}
          </div>
          <div class="flex justify-center mt-[4.8rem]">
            <Link
              to="/gallery"
              class="flex items-center gap-8 capitalize text-inherit text-[1.4rem] bg-[#f5f5dc] py-6 px-12 rounded-xl border border-[#ddddb5] hover:bg-[#bdb76b]"
            >
              view full gallery
              <FaArrowRightLong className="text-[1.6rem]" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
