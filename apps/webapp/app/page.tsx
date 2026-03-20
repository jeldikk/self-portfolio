import { getImageFileUrl } from "@/utils/amplify.server";
import RotatingImages from "@/components/rotating-images/rotating-images.component";
import { Metadata } from "next";
import { META_DATA } from "@/utils/metadata.constants";

export const metadata: Metadata = META_DATA;

const fileNames = [
  "public/images/eye-wink.png",
  "public/images/eyes-closed.png",
  "public/images/front-seeing.jpg",
  "public/images/left-looking.png",
  "public/images/right-looking.png",
];

async function getImageDetails() {
  const getUrlPromises = fileNames.map((fileName) => getImageFileUrl(fileName));
  const details = await Promise.allSettled(getUrlPromises);
  return details;
}

export default async function Home() {
  const imageDetails = await getImageDetails();
  const imageUrls = imageDetails.map((detail) => {
    if (detail.status === "fulfilled") {
      return detail.value.url.toString();
    }
    return "";
  });
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center mt-6">
        Welcome to Portfolio web page of Kamal Kumar
      </h1>
      <p className="text-2g text-center max-w-2xl">
        This Page is under construction
      </p>
      <div className="flex items-center justify-center">
        <RotatingImages imageUrls={imageUrls} />
      </div>
      <footer className="text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Kamal. All rights reserved.
      </footer>
    </div>
  );
}
