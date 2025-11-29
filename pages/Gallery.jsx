"use strict";

// COMPONENTS
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SubHeader from "../src/components/SubHeader";
import Image from "../src/components/Image";

import data from "../src/assets/pic-resource-url.json";

const Gallery = () => {
  const images = data.placeholderImages;
  const galleryImages = images.filter((img) =>
    [
      "gallery-1",
      "gallery-2",
      "gallery-3",
      "gallery-4",
      "gallery-5",
      "gallery-6",
      "gallery-7",
      "gallery-8",
      "gallery-9",
      "gallery-10",
      "gallery-11",
      "gallery-12",
    ].includes(img.id)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* MAIN CONTENT */}
      <main className=" main-content flex flex-col flex-1" id="top">
        {/*  SECTION FULL GALLERY */}
        <section className="pt-35 lg:px-[2.4rem]">
          <SubHeader
            title={"Our Gallery"}
            text={
              "Explore a curated collection of our favorite moments, captured with passion and precision."
            }
          />
          <div className="grid grid-cols-1 gap-6 mb-20 mx-6 lg:mx-40 md:mx-20 md:gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="relative group h-177 overflow-hidden rounded-xl"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.description || "Gallery Image"}
                  loading={"lazy"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                {/* Gradient Overlay (always visible over images) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                {/* Text Overlay (Visible only on hover) */}
                <div class="absolute inset-0 opacity-0 flex items-center justify-center text-center mx-6 group-hover:opacity-100 transition-opacity duration-300">
                  <p class="absolute w-full text-white text-[1.4rem] leading-normal bottom-8">
                    {img.description || "Captivating Moment"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
