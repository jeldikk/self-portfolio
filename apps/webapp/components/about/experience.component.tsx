"use client";

import { motion } from "motion/react";
import { stagger, fadeUp } from "./variants.constants";

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

export default function Experience() {
  return (
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
  );
}
