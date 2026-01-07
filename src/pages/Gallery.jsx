"use strict";

import { useEffect, useState } from "react";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import Image from "../components/Image";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://photography-server-catq.onrender.com/api/admin/gallery"
        );
        const data = await res.json();
        setGalleryImages(data);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* MAIN CONTENT */}
      <main className="main-content flex flex-col flex-1" id="top">
        {/* FULL GALLERY SECTION */}
        <section className="pt-35 lg:px-[2.4rem]">
          <SubHeader
            title={"Our Gallery"}
            text={
              "Explore a curated collection of our favorite moments, captured with passion and precision."
            }
          />

          {/* LOADING STATE */}
          {loading && (
            <p className="text-center mt-20 text-xl">Loading gallery...</p>
          )}

          {/* EMPTY STATE */}
          {!loading && galleryImages.length === 0 && (
            <p className="text-center mt-20 text-xl">
              No gallery images yet.
            </p>
          )}

          {/* GALLERY GRID */}
          <div className="grid grid-cols-1 gap-6 mb-20 mx-6 lg:mx-40 md:mx-20 md:gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="relative group h-177 overflow-hidden rounded-xl"
              >
                <Image
                  src={img.image_url}
                  alt={img.description || "Gallery Image"}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                {/* Hover Text */}
                <div className="absolute inset-0 opacity-0 flex items-center justify-center text-center mx-6 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="absolute w-full text-white text-[1.4rem] leading-normal bottom-8">
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
