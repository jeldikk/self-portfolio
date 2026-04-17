"use client";

import { motion } from "motion/react";
import { stagger, fadeUp } from "./variants.constants";

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

export default function Skills() {
  return (
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
  );
}
