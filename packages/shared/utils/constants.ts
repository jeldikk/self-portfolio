import type { portfolioDetailsSchema } from "../schemas";
import type { z } from "zod";

// This is a sample portfolio details object that adheres to the defined schema. You can modify this object with your actual details.
export const PORTFOLIO_DETAILS: z.infer<typeof portfolioDetailsSchema> = {
  personalInfo: {
    name: "Jeldi Kamal Kumar",
    email: "jeldi.kamal2011@gmail.com",
    location: "Hyderabad, India",
    website: "https://jeldikk.fyi",
    linkedin: "https://www.linkedin.com/in/jeldi-kamal-kumar/",
  },
  professionalSummary:
    "Experienced software engineer with a passion for creating innovative solutions.",
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Node.js"],
    soft: ["Communication", "Teamwork", "Problem Solving"],
  },
  experience: [
    {
      role: "Software Engineer",
      company: "Tech Company",
      location: "Hyderabad, India",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      description:
        "Worked on developing web applications using React and Node.js.",
      bulletPoints: [
        "Implemented new features and optimized existing ones.",
        "Collaborated with cross-functional teams to deliver high-quality products.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology",
      fieldOfStudy: "Computer Science and Engineering",
      institution: "XYZ University",
      graudationYear: "2019",
    },
  ],
};
