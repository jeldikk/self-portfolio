import type { z } from "zod";
import type { portfolioDetailsSchema } from "../schemas";

// This is a sample portfolio details object that adheres to the defined schema. You can modify this object with your actual details.
export const PORTFOLIO_DETAILS: z.infer<typeof portfolioDetailsSchema> = {
  personalInfo: {
    name: "Jeldi Kamal Kumar",
    email: "jeldi.kamal2011@gmail.com",
    location: "Hyderabad, India",
    phone: "+91 8500869685",
    website: "https://jeldikk.fyi",
    linkedin: "https://www.linkedin.com/in/kamal-kumar-jeldi",
    github: "https://github.com/jeldikk",
  },
  professionalSummary: `
    Senior Software Engineer with 10+ years of experience building full-stack web applications using React, Node.js, AWS Serverless and modern frontend tooling.
    Proven in fintech and insurance domains with strong skills in API design, automation, performance testing and CI/CD-driven delivery.
    Passionate about improving release quality with Playwright E2E automation, scalable backend services, and cloud-native architectures.`,
  skills: {
    technical: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Redux Toolkit",
      "Jest",
      "SCSS",
      "Playwright",
      "AWS",
      "AWS Amplify",
      "Serverless",
      "Python",
      "FastAPI",
      "Pydantic",
    ],
    soft: [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Adaptable to new technologies",
      "Mentoring and knowledge sharing",
    ],
    inProgress: [
      "Advance Python",
      "AI Engineering",
      "AI Agents",
      "RAG Application development",
      "AWS Bedrock",
      "Deliver apps with Amplify.",
    ],
  },
  experience: [
    {
      role: "Senior Software Engineer",
      company: "LTIMindtree Limited (LTM)",
      location: "Hyderabad, India",
      startDate: "October 2024",
      endDate: "Present",
      description:
        "Full-stack delivery for an insurance admin tool while building automated test and validation frameworks to improve release quality and deployment stability.",
      bulletPoints: [
        "Senior fullstack developer outsourced in development for an insurance admin tool using Node.js, React, MongoDB and AWS Serverless backed by Genesys Cloud CX to manage customer experience configurations",
        "Track lead for a core module: owned API design, architecture, sprint sequencing and mentoring for timely delivery",
        "Designed and delivered a CI-integrated Playwright E2E framework that runs pre-build and post-deploy smoke tests, increasing release confidence and reducing regressions",
        "Built data-driven Playwright test suites using tags to run the same scenarios across multiple configurations, improving coverage and maintainability",
        "Established automated pre-deploy and post-deploy validation checks to catch issues earlier in the pipeline and shorten mean time to detection",
        "Developed Artillery-based load testing plans to identify and remediate performance bottlenecks under realistic traffic patterns",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Edgeverve Systems Limited",
      location: "Hyderabad, India",
      startDate: "August 2023",
      endDate: "October 2024",
      description:
        "Delivered frontend modernization and performance validation for a treasury web solution while enabling configurable client UIs and automated quality checks.",
      bulletPoints: [
        "Contributed to a web-transformation of a treasury solution, focusing on frontend and performance improvements",
        "Designed and executed Artillery load tests to validate stability and guide capacity planning",
        "Architected a webpack-based client customization framework to enable rapid, client-specific UI variants",
        "Automated critical user flows with Playwright to reduce manual QA effort and shorten release cycles",
        "Implemented signature-based pre-validation to mitigate malicious requests and strengthen input validation",
        "Authored onboarding and technical documentation to accelerate new-hire ramp-up",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Mphasis Limited",
      location: "Bangalore, India",
      startDate: "April 2021",
      endDate: "August 2023",
      description: "",
      bulletPoints: [
        "Built scalable, modular web applications for a fintech client using React and Node.js",
        "Modernized legacy screens with responsive UI and improved UX using React and Bootstrap",
        "Developed onboarding flows, dashboards and interactive visualizations using Redux Toolkit and D3.js to improve user analytics",
        "Owned API contract design and collaborated with backend teams to ensure scalability and performance",
      ],
    },
    {
      role: "Mid Software Engineer",
      company: "National Atmospheric Research Laboratory (NARL)",
      location: "Tirupati, India",
      startDate: "December 2014",
      endDate: "March 2021",
      description: "",
      bulletPoints: [
        "Developed a web application for atmospheric research data management using Python and Django",
        "Led in-house development of Radar Controller software to operate and monitor weather radar systems, improving reliability",
        "Built CLI and web tools for housekeeping and health monitoring of radar systems",
        "Automated radar data processing pipelines with NumPy and Pandas to eliminate manual processing and speed up product generation",
      ],
    },
    {
      role: "Junior Software Engineer",
      company: "Semi Conductor Laboratory (SCL)",
      location: "Mohali, India",
      startDate: "October 2013",
      endDate: "November 2014",
      description: "",
      bulletPoints: [
        "Developed a web application for semiconductor manufacturing data management",
        "Built CSV-driven visualization tools to track batch- and wafer-level failures for production analytics",
        "Contributed to Mask Data Preparation and Analysis tooling to improve manufacturing throughput",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech, Avionics",
      fieldOfStudy: "Electronics, Computers, DBMS",
      institution: "Indian Institute of Space Science and Technology (IIST)",
      graduationYear: "2013",
    },
    {
      degree: "Intermediate, MPC",
      fieldOfStudy: "Maths, Physics, Chemistry",
      institution: "Sri Chaitanya Raman Bhavan Campus, Vijayawada",
      graduationYear: "2009",
    },
  ],
};

/**
 * Transforms a PORTFOLIO_DETAILS object (adhering to portfolioDetailsSchema)
 * into a clean, ATS-friendly plain text resume format.
 */
export function portfolioDetailsToText(): string {
  const portfolio = PORTFOLIO_DETAILS;
  const lines: string[] = [];

  // ── Header / Personal Info ────────────────────────────────────────────────
  const { personalInfo } = portfolio;

  lines.push(personalInfo.name.toUpperCase());
  const contactParts: string[] = [];
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (contactParts.length > 0) lines.push(contactParts.join(" | "));

  const linkParts: string[] = [];
  if (personalInfo.website) linkParts.push(personalInfo.website);
  if (personalInfo.linkedin) linkParts.push(personalInfo.linkedin);
  if (personalInfo.github) linkParts.push(personalInfo.github);
  if (linkParts.length > 0) lines.push(linkParts.join(" | "));

  lines.push("");

  // ── Professional Summary ──────────────────────────────────────────────────
  if (portfolio.professionalSummary) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push(portfolio.professionalSummary.trim());
    lines.push("");
  }

  // ── Technical Skills ──────────────────────────────────────────────────────
  if (portfolio.skills.technical.length > 0) {
    lines.push("TECHNICAL SKILLS");
    lines.push(portfolio.skills.technical.join(", "));
    lines.push("");
  }

  // ── Soft Skills ───────────────────────────────────────────────────────────
  if (portfolio.skills.soft.length > 0) {
    lines.push("SOFT SKILLS");
    lines.push(portfolio.skills.soft.join(", "));
    lines.push("");
  }

  // ── Skills in Progress ────────────────────────────────────────────────────
  if (portfolio.skills.inProgress.length > 0) {
    lines.push("SKILLS IN PROGRESS");
    lines.push(portfolio.skills.inProgress.join(", "));
    lines.push("");
  }

  // ── Experience ────────────────────────────────────────────────────────────
  if (portfolio.experience.length > 0) {
    lines.push("EXPERIENCE");
    lines.push("");

    for (const exp of portfolio.experience) {
      const header = `${exp.role} | ${exp.company}${exp.location ? ` | ${exp.location}` : ""}`;
      lines.push(header);

      const dateRange = `${exp.startDate} – ${exp.endDate || "Present"}`;
      lines.push(dateRange);

      if (exp.description) {
        lines.push(exp.description);
      }

      for (const bullet of exp.bulletPoints) {
        lines.push(`- ${bullet}`);
      }

      lines.push("");
    }
  }

  // ── Education ─────────────────────────────────────────────────────────────
  if (portfolio.education.length > 0) {
    lines.push("EDUCATION");
    lines.push("");

    for (const edu of portfolio.education) {
      const parts: string[] = [edu.degree];
      if (edu.fieldOfStudy) parts.push(edu.fieldOfStudy);
      if (edu.institution) parts.push(edu.institution);
      if (edu.graduationYear) parts.push(edu.graduationYear);
      lines.push(parts.join(" | "));
    }

    lines.push("");
  }

  return lines.join("\n").trim();
}

/**
 * Transform a Experience Details array into a clean ATS-friendsly plan text resume format
 */
export function portfolioExperienceToText(): string {
  const portfolio = PORTFOLIO_DETAILS;
  const lines: string[] = [];
  if (portfolio.experience.length > 0) {
    lines.push("EXPERIENCE");
    lines.push("");

    for (const exp of portfolio.experience) {
      const header = `${exp.role} | ${exp.company}${exp.location ? ` | ${exp.location}` : ""}`;
      lines.push(header);

      const dateRange = `${exp.startDate} – ${exp.endDate || "Present"}`;
      lines.push(dateRange);

      if (exp.description) {
        lines.push(exp.description);
      }

      for (const bullet of exp.bulletPoints) {
        lines.push(`- ${bullet}`);
      }

      lines.push("");
    }
  }

  return lines.join("\n").trim();
}
