"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const imageUrls = [
  "/images/eye-wink.png",
  "/images/eyes-closed.png",
  "/images/front-seeing.jpg",
  "/images/left-looking.png",
  "/images/right-looking.png",
];

export default function RotatingImages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotating-images h-48 w-48 md:h-80 md:w-80 relative">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrls[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="rounded-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
