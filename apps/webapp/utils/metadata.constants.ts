import { Metadata } from "next";

export const META_DATA: Metadata = {
  title: "Kamal Kumar Jeldi | Senior MERN Full Stack Developer.",
  description:
    "A Senior Software Engineer by Profession with 10+ years of experience specializing in TypeScript, MERN stack, React, Node.js, Playwright automation and AWS.",
  keywords: [
    "Senior Software Engineer",
    "Full Stack Developer",
    "TypeScript",
    "MERN Stack",
    "React",
    "Node.js",
    "Playwright",
    "AWS",
  ],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION_ID,
  },
  openGraph: {
    title: "Kamal Kumar Jeldi | Senior MERN Full Stack Developer.",
    description:
      "A Senior Software Engineer by Profession with 10+ years of experience specializing in TypeScript, MERN stack, React, Node.js, Playwright automation and AWS.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "jeldikk.fyi",
    locale: "en_US",
    type: "website",
    countryName: "India",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
