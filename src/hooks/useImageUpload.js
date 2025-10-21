import { useState, useEffect } from "react";

const DEFAULT_IMAGES = {
  course: "/images/default-course.jpg",
  avatar: "/images/default-avatar.png",
};

export const useImageUpload = (defaultImage = DEFAULT_IMAGES.course) => {
  const [image, setImage] = useState(defaultImage);
  const [uploading, setUploading] = useState(false);

  const resetImage = () => {
    setImage(defaultImage);
  };

  const setImageDirectly = (newImage) => {
    if (newImage) {
      setImage(newImage);
    } else {
      setImage(defaultImage);
    }
  };

  return {
    image,
    uploading,
    handleImageUpload: null,
    resetImage,
    setImage: setImageDirectly,
  };
};
