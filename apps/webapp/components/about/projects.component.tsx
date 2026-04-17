"use client";

import { motion } from "motion/react";
import { stagger, fadeUp } from "./variants.constants";
import Link from "next/link";

const projects = [
  {
    name: "self-portfolio",
    url: "https://github.com/jeldikk/self-portfolio",
    description:
      "This portfolio — a fullstack production app built on AWS Amplify Gen2, Next.js App Router, DaisyUI, Redux Toolkit and Turborepo. Features auth, contact-me API, admin panel, S3 storage and PostHog analytics.",
    tags: ["Next.js", "AWS Amplify Gen2", "TypeScript", "Turborepo", "DaisyUI"],
    updated: "Active",
    language: "TypeScript",
  },
  {
    name: "amplify-gen2-turborepo-starter",
    url: "https://github.com/jeldikk/amplify-gen2-turborepo-starter",
    description:
      "An open-source Turborepo starter for fullstack AWS Amplify Gen2 apps. Ships with Next.js, Cognito auth, Amplify Data, Redux Toolkit, Context Providers and server utility helpers out of the box. Forked by the community.",
    tags: [
      "AWS Amplify Gen2",
      "Next.js",
      "Redux Toolkit",
      "Turborepo",
      "TypeScript",
    ],
    updated: "Last week",
    language: "TypeScript",
  },
  {
    name: "chits-project",
    url: "https://github.com/jeldikk/chits-project",
    description:
      "A full-featured chit-fund management application built as a Turborepo monorepo (Next.js frontend + Amplify Gen2 backend). Covers member management, cheeti dashboard, currency formatting, manager tenure tracking and ordinal date display. 31+ merged PRs.",
    tags: [
      "Next.js",
      "AWS Amplify Gen2",
      "TypeScript",
      "Monorepo",
      "Turborepo",
    ],
    updated: "2 months ago",
    language: "TypeScript",
  },
  {
    name: "multi-lambda-cdk-project",
    url: "https://github.com/jeldikk/multi-lambda-cdk-project",
    description:
      "Production-style AWS CDK project wiring multiple TypeScript Lambdas behind API Gateway with Cognito authorisation, AuthStack integration, and AWS Lambda Powertools Tracer for structured observability. Includes Jest unit tests.",
    tags: [
      "AWS CDK",
      "Lambda",
      "API Gateway",
      "Cognito",
      "Lambda Powertools",
      "TypeScript",
    ],
    updated: "4 months ago",
    language: "TypeScript",
  },
  {
    name: "e2e-api-redis-poc",
    url: "https://github.com/jeldikk/e2e-api-redis-poc",
    description:
      "A POC demonstrating Playwright-driven E2E API integration tests for a Node.js API that uses Redis-based rate limiting. Validates both happy-path and rate-limit scenarios end-to-end without a live Redis instance via redis-memory-server.",
    tags: ["Playwright", "Node.js", "Redis", "API Testing", "JavaScript"],
    updated: "7 months ago",
    language: "JavaScript",
  },
];

export default function Projects() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
      className="space-y-8"
    >
      <motion.div variants={fadeUp} className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Projects
        </p>
        <h2 className="text-3xl font-bold md:text-5xl">
          Selected Work on GitHub
        </h2>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group flex flex-col gap-4 rounded-3xl border border-base-300/70 bg-base-100/85 p-6 shadow-xl backdrop-blur transition-shadow hover:shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 shrink-0 text-base-content/50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
              </div>
              <span className="shrink-0 text-xs text-base-content/45">
                {project.updated}
              </span>
            </div>

            <p className="flex-1 text-sm leading-7 text-base-content/70">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-base-content/45">
              <span className="inline-block h-3 w-3 rounded-full bg-primary/70" />
              {project.language}
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div variants={fadeUp} className="flex justify-center">
        <Link
          href="https://github.com/jeldikk?tab=repositories"
          target="_blank"
          className="btn btn-outline btn-lg"
        >
          View All Repositories
        </Link>
      </motion.div>
    </motion.section>
  );
}
