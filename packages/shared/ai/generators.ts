import { generateText, Output } from "ai";
import { portfolioDetailsSchema } from "../schemas";
import { bedrock } from "./client";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  serviceName: "self-portfolio-generator-service",
});

export async function generateResume(
  resumeText: string,
  jobDescription: string,
) {
  const maxRetries = parseInt(process.env.MAX_RETRIES as string, 10) ?? 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { text, output } = await generateText({
        model: bedrock("openai.gpt-oss-120b-1:0"),
        system: `
                You are an expert technical resume writer and ATS optimization specialist. Rewrite and refine the provided resume to maximize its alignment with the given Job Description. Maintain strict factual accuracy—do not invent data, but rephrase existing experience to highlight relevant keyword matches.

                IMPORTANT: You MUST respond with ONLY a valid JSON object. No markdown formatting, no code blocks, no additional text. The JSON must strictly conform to the schema provided.
            `,
        prompt: `
            --- INPUT RESUME ---
            ${resumeText}

            --- TARGET JOB DESCRIPTION ---
            ${jobDescription}

            --- OUTPUT FORMAT ---
            Respond with ONLY a valid JSON object that matches this exact schema structure:
            {
                "personalInfo": { "name": "string", "email": "string", "phone": "string (optional)", "location": "string (optional)", "website": "string (optional)", "linkedin": "string (optional)", "github": "string (optional)" },
                "professionalSummary": "string",
                "skills": { "technical": ["string"], "soft": ["string"], "inProgress": ["string"] },
                "experience": [{ "role": "string", "company": "string", "location": "string", "startDate": "string", "endDate": "string (optional)", "description": "string", "bulletPoints": ["string"] }],
                "education": [{ "degree": "string", "fieldOfStudy": "string", "institution": "string", "graduationYear": "string (optional)" }]
            }

            Do NOT include any text outside the JSON object. Do NOT wrap it in markdown code blocks. Output raw JSON only.
        `,
        output: Output.object({
          schema: portfolioDetailsSchema,
        }),
      });

      return { text, output }; // success
    } catch (error) {
      lastError = error as Error;
      logger.error(`Attempt ${attempt}/${maxRetries} failed:`, { error });

      if (attempt < maxRetries) {
        // Exponential backoff before retrying
        const delay = Math.min(1000 * 2 ** (attempt - 1), 5000);
        logger.info(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
