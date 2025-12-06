"use strict";

// ICONS
import { CiImageOn } from "react-icons/ci";

const ImageUpload = ({ label, onFileSelect }) => {
  // handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file); // pass file to parent
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-text-foreground">{label}</label>
      <div className="flex justify-center mt-5 rounded-lg border-2 border-dashed border-gray-300 px-[2.4rem] py-16">
        <div className="text-center">
          <CiImageOn className="mx-auto text-[5rem] text-gray-400" />
          <div className="mt-6 flex text-sm leading-6 text-gray-600 justify-center items-center gap-2">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-lg font-semibold text-[#9c7f5c] text-2xl hover:text-[#9c7f5c]/80"
            >
              <span>Upload a file</span>
              <input
                type="file"
                id="file-upload"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
              />
            </label>
            <span className="text-2xl">or drag and drop</span>
          </div>
          <p className="text-xl leading-5 text-gray-500 mt-2">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
