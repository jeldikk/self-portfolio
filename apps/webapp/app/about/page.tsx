"use client";

import Link from "next/link";
import { motion } from "motion/react";

import RotatingImages from "@/components/rotating-images/rotating-images.component";

const experienceTimeline = [
  {
    company: "EdgeVerve Systems",
    role: "Product Technical Lead",
    period: "August 2023 - Present",
    location: "Hyderabad",
    highlights: [
      "Contributed to a web-transformed treasury solution used in finance workflows.",
      "Ran load analysis with artillery.io to measure stability under varied traffic patterns.",
      "Built a webpack-based customization framework for client-side financial product tailoring.",
      "Demonstrated treasury deal automation flows with Playwright for end-to-end integration coverage.",
      "Added signature-bytes pre-validation to harden file upload security.",
    ],
  },
  {
    company: "Mphasis Limited",
    role: "Senior Software Engineer",
    period: "April 2021 - August 2023",
    location: "Bangalore",
    highlights: [
      "Built scalable fintech product screens with a focus on modular UI architecture.",
      "Modernized legacy screens with updated interaction patterns and business-aligned designs.",
      "Delivered onboarding, dashboard, and interactive visualization experiences.",
      "Worked with backend teams on web API design for product workflows.",
    ],
  },
  {
    company: "National Atmospheric Research Laboratory",
    role: "Engineer - SD",
    period: "December 2014 - March 2021",
    location: "Tirupati",
    highlights: [
      "Led in-house development of radar controller software for India's MST radar using Python.",
      "Built supporting tooling for experiments, health logging, and data workflows.",
      "Designed reusable modules for extraction and processing pipelines.",
      "Mentored students and research scholars in Python development.",
    ],
  },
  {
    company: "Semi Conductor Laboratory",
    role: "Junior Level Engineer - SC",
    period: "October 2013 - November 2014",
    location: "Mohali",
    highlights: [
      "Developed a web tool to visualize and track batch-level and wafer-level failures from CSV extracts.",
      "Worked in mask data preparation and learned a domain-specific tool language for lithography workflows.",
    ],
  },
];

const educationTimeline = [
  {
    institution: "Indian Institute of Space Science & Technology (IIST)",
    qualification: "B.Tech, Avionics",
    period: "August 2009 - August 2013",
    location: "Trivandrum",
    details: "Studied DBMS, Wireless Mesh Networks, and Computer Graphics.",
  },
  {
    institution: "Sri Chaitanya Raman Bhavan Campus",
    qualification: "Intermediate",
    period: "April 2007 - May 2009",
    location: "Vijayawada",
    details: "Focused on Maths, Physics, and Chemistry.",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Redux",
      "HTML & CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "Web APIs", "REST / GraphQL", "AWS Amplify"],
  },
  {
    title: "AWS Serverless",
    items: [
      "AWS Lambda",
      "Amazon DynamoDB",
      "Amazon Cognito",
      "AWS AppSync",
      "Amazon S3",
      "API Gateway",
      "AWS CDK / SAM",
      "IAM & Policies",
    ],
  },
  {
    title: "Delivery",
    items: [
      "Playwright",
      "Artillery",
      "Webpack",
      "Security Validation",
      "Responsive UI",
    ],
  },
];

const depthStats = [
  { label: "Total experience", value: "10+ years" },
  { label: "React", value: "5+ years" },
  { label: "Node.js", value: "6+ years" },
  { label: "AWS Serverless", value: "3+ years" },
];

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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export default function About() {
  return (
    <main className="relative overflow-hidden bg-base-100 text-base-content">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-32 h-112 w-md rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-12 md:px-10 lg:px-12 lg:py-20">
        <motion.section
          initial="hidden"
          animate="show"
          variants={stagger}
          className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <motion.div variants={fadeUp} className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary badge-outline badge-lg">
                About Me
              </span>
              <span className="badge badge-secondary badge-outline badge-lg">
                Cloud Native Fullstack Developer
              </span>
              <span className="badge badge-accent badge-outline badge-lg">
                AWS Serverless
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
                Building resilient web products with modern frontend and
                cloud-native tooling.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-base-content/75 md:text-xl">
                I am Jeldi Kamal Kumar, a fullstack engineer with 10+ years of
                software experience across product engineering, fintech, and
                scientific systems. My work blends React and Next.js UI craft,
                Node.js and Python backend delivery, and a deep focus on AWS
                serverless architecture — Lambda, DynamoDB, AppSync, Cognito,
                S3, API Gateway, and AWS Amplify Gen 2 powered by CDK/SAM.
              </p>
            </div>

            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {depthStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-base-300/70 bg-base-200/70 p-5 shadow-lg backdrop-blur"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/55">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact-me" className="btn btn-primary btn-lg">
                Let&apos;s Connect
              </Link>
              <Link
                href="/jeldikk-updated-resume_v2_2.pdf"
                className="btn btn-outline btn-lg"
                target="_blank"
              >
                View Resume
              </Link>
              <Link
                href="https://github.com/jeldikk"
                className="btn btn-ghost btn-lg"
                target="_blank"
              >
                GitHub
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md rounded-4xl border border-base-300/70 bg-base-200/75 p-6 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="rounded-4xl bg-base-100/60 p-4 shadow-inner">
                  <RotatingImages />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold">Jeldi Kamal Kumar</h2>
                  <p className="text-base text-base-content/70">
                    Guntur, Andhra Pradesh, India
                  </p>
                </div>
                <div className="grid w-full gap-3 text-left sm:grid-cols-2">
                  <div className="rounded-2xl bg-base-100/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-base-content/50">
                      Focus
                    </p>
                    <p className="mt-2 font-semibold">
                      React / Next.js + AWS Serverless
                    </p>
                  </div>
                  <div className="rounded-2xl bg-base-100/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-base-content/50">
                      Current theme
                    </p>
                    <p className="mt-2 font-semibold">
                      Event-driven, low-ops cloud-native products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-6 rounded-4xl border border-base-300/70 bg-base-200/55 p-8 shadow-xl backdrop-blur md:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Profile
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Product-minded engineering grounded in delivery.
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="space-y-4 text-base leading-8 text-base-content/75"
          >
            <p>
              My background spans enterprise treasury platforms, fintech user
              journeys, scientific tooling, and internal automation systems. I
              value software that is maintainable, observable, and secure under
              real-world load.
            </p>
            <p>
              Recent work has centered on React, Next.js, Node.js, Python,
              testing automation, and customization frameworks. On the cloud
              side I design serverless backends with AWS Lambda, DynamoDB,
              AppSync (GraphQL), Cognito auth flows, S3, and API Gateway — all
              wired together through AWS Amplify Gen 2 and Infrastructure as
              Code via CDK and SAM.
            </p>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Experience
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">Career Timeline</h2>
          </motion.div>

          <div className="relative space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-base-300 md:before:left-1/2 md:before:-translate-x-1/2">
            {experienceTimeline.map((entry, index) => (
              <motion.article
                key={`${entry.company}-${entry.role}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="relative grid gap-4 md:grid-cols-2 md:gap-10"
              >
                <div
                  className={`hidden md:block ${index % 2 === 0 ? "order-1" : "order-2"}`}
                />
                <div
                  className={`relative rounded-[1.75rem] border border-base-300/70 bg-base-100/85 p-6 shadow-xl backdrop-blur ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="absolute left-4 top-8 h-3.5 w-3.5 rounded-full bg-primary ring-8 ring-base-100 md:left-auto md:right-auto md:top-10" />
                  <div className="space-y-4 pl-6 md:pl-0">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="badge badge-secondary badge-outline">
                          {entry.period}
                        </span>
                        <span className="text-sm text-base-content/55">
                          {entry.location}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">{entry.role}</h3>
                      <p className="text-lg text-base-content/70">
                        {entry.company}
                      </p>
                    </div>
                    <ul className="space-y-3 text-base leading-7 text-base-content/75">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

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

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="space-y-6 rounded-4xl border border-base-300/70 bg-base-200/55 p-8 shadow-xl backdrop-blur"
          >
            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Education
              </p>
              <h2 className="text-3xl font-bold">Academic Foundation</h2>
            </motion.div>

            <div className="space-y-5">
              {educationTimeline.map((entry) => (
                <motion.article
                  key={entry.institution}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl bg-base-100/80 p-6 shadow-lg"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold">{entry.institution}</h3>
                      <p className="text-base-content/70">
                        {entry.qualification}
                      </p>
                    </div>
                    <span className="badge badge-outline">
                      {entry.location}
                    </span>
                  </div>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-base-content/50">
                    {entry.period}
                  </p>
                  <p className="mt-3 leading-7 text-base-content/75">
                    {entry.details}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="space-y-6 rounded-4xl border border-base-300/70 bg-base-200/55 p-8 shadow-xl backdrop-blur"
          >
            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Skills
              </p>
              <h2 className="text-3xl font-bold">Tools I Rely On</h2>
            </motion.div>

            <div className="space-y-5">
              {skillGroups.map((group) => (
                <motion.div
                  key={group.title}
                  variants={fadeUp}
                  className="rounded-3xl bg-base-100/80 p-6 shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold">{group.title}</h3>
                    <span className="text-sm text-base-content/55">
                      {group.items.length} tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.04 }}
                        className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
