import { z } from "zod";

export const portfolioDetailsSchema = z.object({
  personalInfo: z.object({
    name: z.string().max(100),
    email: z.string().email(),
    phone: z.string().max(20).optional(),
    location: z.string().max(100).optional(),
    website: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  professionalSummary: z
    .string()
    .describe("A brief summary of your professional background and skills."),
  skills: z.object({
    technical: z
      .array(z.string())
      .describe(
        "List of technical skills, e.g., programming languages, tools, frameworks, Databases, Cloud platforms, etc.",
      ),
    soft: z
      .array(z.string())
      .describe("List of soft skills, e.g., communication, teamwork."),
    inProgress: z
      .array(z.string())
      .describe("Skills you are currently learning or improving."),
  }),
  experience: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z
        .string()
        .describe(
          "A brief description of your responsibilities and achievements in this role.",
        ),
      bulletPoints: z
        .array(z.string())
        .describe("Key achievements or responsibilities in bullet points."),
    }),
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      fieldOfStudy: z.string(),
      institution: z.string(),
      graudationYear: z.string().optional(),
    }),
  ),
});
