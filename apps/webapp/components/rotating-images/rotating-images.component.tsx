"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  imageUrls: string[];
};

export default function RotatingImages(props: Props) {
  const { imageUrls } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  return (
    <div className="rotating-images">
      <Image
        src={imageUrls[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        width={300}
        height={300}
        className="rounded-full"
      />
    </div>
  );
}
