import { Metadata } from "next";

export const META_DATA: Metadata = {
  title: "Senior TypeScript Developer & Full Stack Engineer | jeldikk.fyi",
  description:
    "Kamal Kumar Jeldi is a Senior Software Engineer specializing in TypeScript and the MERN stack. Explore my projects in React, Node.js, and automated testing with Playwright.",
  keywords: [
    "Senior Software Engineer",
    "Full Stack Developer",
    "Portfolio",
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
    title: "Senior TypeScript Developer & Full Stack Engineer | jeldikk.fyi",
    description:
      "Kamal Kumar Jeldi is a Senior Software Engineer specializing in TypeScript and the MERN stack. Explore my projects in React, Node.js, and automated testing with Playwright.",
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
