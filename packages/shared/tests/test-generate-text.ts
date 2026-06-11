import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});
// import { bedrock } from "../ai";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { portfolioDetailsToText } from "../utils";
import { portfolioDetailsSchema } from "../schemas";
import { generateResume } from "../ai";

const jd1 = `
            We are seeking a highly skilled and motivated Senior MERN Stack Developer with strong AWS cloud expertise to join our growing engineering team. In this role, you will be responsible for designing, building, and maintaining scalable, high-performance web applications.

            As a senior member of the team, you will drive architectural decisions, mentor junior developers, and bridge the gap between complex backend microservices and responsive frontend user interfaces. The ideal candidate thrives in a fast-paced environment, possesses strong problem-solving skills, and has a proven track record of deploying robust production applications on AWS.

            ## Key Responsibilities:
            ### Architecture & Development
            Design, develop, and deploy robust, scalable, and secure full-stack applications using the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript.

            Architect and optimize high-throughput, low-latency RESTful and GraphQL APIs.

            Design efficient database schemas in MongoDB (and/or SQL databases), ensuring data integrity, performance, and optimal indexing.

            Build responsive, reusable, and state-managed frontend components using React.js (and frameworks like Next.js where applicable).

            ### AWS Cloud & DevOps
            Architect and maintain cloud infrastructure on AWS, leveraging serverless components (AWS Lambda, API Gateway) and containerized environments (ECS/EKS).

            Implement secure data protection and encryption strategies using AWS KMS and IAM policies.

            Optimize application performance, monitoring, and logging utilizing AWS CloudWatch, X-Ray, or similar APM tools.

            Collaborate on building and maintaining CI/CD deployment pipelines (AWS CodePipeline, GitHub Actions, or Jenkins).

            ## Leadership & Collaboration
            Provide technical leadership, participate in code reviews, and enforce engineering best practices (TDD, clean code, documentation).

            Collaborate closely with product managers, UI/UX designers, and other stakeholders to translate business requirements into technical solutions.

            Mentor and guide junior and mid-level engineers to foster continuous professional growth within the team.

            ## Technical Skills & Qualifications
            ### Required Experience
            Bachelor’s Degree in Computer Science, Information Technology, or a related field (or equivalent practical experience).

            5+ years of professional experience in full-stack web development using Node.js and React.js.

            2+ years of hands-on experience building, deploying, and managing cloud infrastructure on AWS.

            ### Technical Proficiencies
            **Frontend**: Deep understanding of React.js, React Hooks, state management (Redux, Context API), HTML5, CSS3, and modern CSS frameworks (Tailwind, Material UI).

            **Backend**: Advanced proficiency in Node.js, Express.js, and asynchronous programming. Strong experience with TypeScript is highly preferred.

            **Databases**: Strong expertise in MongoDB (aggregation pipelines, indexing, modeling) and familiarity with caching layers like Redis.

            **AWS Services**: Solid experience with core services: AWS Lambda, API Gateway, DynamoDB, S3, EC2, IAM, and AWS Bedrock/Cognito (if applicable to your tech stack).

            **Tools**: Proficient with Git version control, Docker, and modern testing frameworks (Jest, Mocha, Cypress).

            ## Soft Skills
            Excellent communication and collaboration skills.

            Strong analytical thinking and structural problem-solving capabilities.

            Ability to manage time effectively, prioritize tasks, and deliver high-quality work under tight deadlines.

            A strong desire to stay updated with emerging technologies (e.g., Generative AI integration, cloud-native patterns).

            ## What We Offer
            Competitive salary and performance-based bonuses.

            Comprehensive health, dental, and vision insurance.

            Flexible working hours and [remote / hybrid] work options.

            Generous Paid Time Off (PTO) and parental leave.

            Budget for professional development, certifications (like AWS Certified Developer/Solutions Architect), and learning resources.
        `;

const jd2 = `
    About the Role:
We want a TypeScript-first Senior Full-Stack Engineer whose primary strength is building production systems with React and Node.js (including experience with frameworks such as NestJS), and who is also a capable Python developer for data-heavy and integration work. You’ll operate in an agentic engineering environment: small, high-autonomy teams that own problems end-to-end, leverage AI/agents as part of their workflow, and maintain a strong TDD and quality discipline.


Responsibilities:
Build and maintain end-to-end features across React (frontend) and TypeScript-based backend services (Node.js, NestJS, and other frameworks).
Implement and evolve RESTful and/or GraphQL APIs integrating with data and analytics pipelines.
Use Python for backend services, data processing, and integration with data/ML-oriented systems where appropriate.
Design and optimize schemas, queries, and data flows in PostgreSQL and MySQL with strong SQL fundamentals.
Apply TDD and automated testing (unit, integration, E2E) as the default way of working.
Collaborate with product, design, and data teams to ship measurable outcomes, not just features.
Contribute to frontend architecture, design systems, and performance optimizations in React.
Help evolve tooling and practices for agentic engineering (for example, using AI agents for code, tests, and ops under human oversight).


Core Tech Stack

Frontend: React, TypeScript, React Query, Zustand, React Hook Form, React Router, AG Grid, TailwindCSS, Vite
Backend: Node.js (TypeScript), NestJS, Prisma, PostgreSQL, MySQL, Python, Jest, Pytest
Infrastructure: GCP (preferred), Docker, Kubernetes, GitLab CI/CD
Testing: TDD, Jest, Pytest, Playwright, CI-integrated quality gates
Data / Visualization (nice to have): D3.js, Recharts, Vega, or similar


Requirements

Experience Range - 8-12 years :Expert-level TypeScript with deep experience in React and modern Node.js backend development (NestJS experience strongly preferred but not the only acceptable framework).
Capable Python developer, comfortable writing production-grade services, scripts, and integrations.
Strong SQL skills and experience designing relational schemas and optimizing queries in PostgreSQL and MySQL.
Proven TDD track record and a disciplined approach to automated testing.
Experience shipping and operating production systems in cloud-native environments (Docker, Kubernetes, GCP or similar).
Solid understanding of asynchronous programming, performance, and reliability in Node.js and browser environments.
Comfortable working in high-autonomy, fast-moving, remote teams, collaborating across engineering, product, and data.


What We Value

Agentic engineering: You define goals, use tools/agents to execute, and own the result end-to-end, with strong verification and governance.
Type-safe, test-first mindset: You treat types and tests as core design tools, not afterthoughts.
Ownership: You take responsibility from architecture through to production operations.
Pragmatism: You balance speed and quality, and know when “good enough” is actually enough.
Continuous improvement: You improve systems, workflows, and how we use AI/agents to build software.
`;

async function main() {
  const resumeText = portfolioDetailsToText();
  const jobDescription = jd1;

  const output = await generateResume(resumeText, jobDescription);

  console.dir({ output }, { depth: null });
}

main()
  .then(() => {
    console.log("Completed generation");
  })
  .catch((err) => {
    console.error(err);
  });
