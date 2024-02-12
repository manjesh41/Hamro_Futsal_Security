import React, { useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
  ]);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
            <div className="absolute top-0 right-0 m-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-opacity opacity-0 group-hover:opacity-100"
                onClick={() => handleDeleteImage(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
            id="uploadInput"
          />
          <label
            htmlFor="uploadInput"
            className="flex items-center justify-center max-h-full
            , max-w-full rounded-lg border-2 border-dashed border-gray-400 cursor-pointer transition-opacity opacity-100 "
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
