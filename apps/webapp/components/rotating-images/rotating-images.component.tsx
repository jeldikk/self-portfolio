"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const imageUrls = [
  "/images/eye-wink.png",
  "/images/eyes-closed.png",
  "/images/front-seeing.jpg",
  "/images/left-looking.png",
  "/images/right-looking.png",
];

type Props = {
  imageUrls: string[];
};

export default function RotatingImages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  return (
    <div className="rotating-images h-48 w-48 md:h-80 md:w-80 relative">
      <Image
        src={imageUrls[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        fill
        className="rounded-full"
      />
    </div>
  );
}
