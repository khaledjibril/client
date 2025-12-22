"use strict";

const ImageUpload = ({ label, onFileSelect, preview }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="capitalize text-text-foreground font-medium leading-12">
        {label}
      </label>

      <div className="relative w-full h-[280px] border-2 border-dashed border-border rounded-lg bg-[#f5f5dc] flex items-center justify-center overflow-hidden cursor-pointer">
        {/* Preview Image */}
        {preview ? (
          <img
            src={preview}
            alt="Uploaded preview"
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <p className="text-gray-500 text-[1.4rem] text-center px-4 leading-6 sm:leading-0">
            Click or drag an image here to upload
          </p>
        )}

        {/* Invisible file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
