"use strict";

const ImageUpload = ({
  label = "Upload an image",
  onFileSelect,
  preview,
  disabled = false,
}) => {
  const MAX_SIZE_MB = 5;

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-3">
      //<label className="capitalize text-text-foreground font-medium">
        {label}
      </label>

      <div
        className={`relative w-full h-[280px] border-2 border-dashed rounded-lg
        bg-[#f5f5dc] flex items-center justify-center overflow-hidden
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <p className="text-gray-500 text-[1.4rem] text-center px-4">
            Click or drag an image here to upload
          </p>
        )}

        <input
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={handleChange}
          className="absolute inset-0 opacity-0"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
