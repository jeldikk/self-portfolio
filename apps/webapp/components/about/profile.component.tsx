"use client";

import { motion } from "motion/react";

import { stagger, fadeUp } from "@/components/about/variants.constants";

export default function Profile() {
  return (
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
          journeys, scientific tooling, and internal automation systems. I value
          software that is maintainable, observable, and secure under real-world
          load.
        </p>
        <p>
          Recent work has centered on React, Next.js, Node.js, Python, testing
          automation, and customization frameworks. On the cloud side I design
          serverless backends with AWS Lambda, DynamoDB, AppSync (GraphQL),
          Cognito auth flows, S3, and API Gateway — all wired together through
          AWS Amplify Gen 2 and Infrastructure as Code via CDK and SAM.
        </p>
      </motion.div>
    </motion.section>
  );
}
