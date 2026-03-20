import { Metadata } from "next";

export const META_DATA: Metadata = {
  title: "Senior TypeScript Developer & Full Stack Engineer",
  description:
    "Senior Software Engineer specializing in TypeScript, MERN stack, React, Node.js, and Playwright automation.",
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
    title: "Senior TypeScript Developer & Full Stack Engineer",
    description:
      "Senior Software Engineer specializing in TypeScript, MERN stack, React, Node.js, and Playwright automation.",
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
