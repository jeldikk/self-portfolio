import { z } from "zod";

export const resumeBuilderSchema = z.object({
  name: z.string(),
  jobDescription: z.string(),
  companyName: z.string(),
  pdfTemplateType: z.enum(["single_column", "two_column"]),
});
