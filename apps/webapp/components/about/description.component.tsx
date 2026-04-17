"use client";

import { motion } from "motion/react";
import Link from "next/link";
import RotatingImages from "@/components/rotating-images/rotating-images.component";

import { fadeUp, stagger } from "@/components/about/variants.constants";

const depthStats = [
  { label: "Total experience", value: "10+ years" },
  { label: "React", value: "5+ years" },
  { label: "Node.js", value: "6+ years" },
  { label: "AWS Serverless", value: "3+ years" },
];

export default function Description() {
  return (
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
            serverless architecture — Lambda, DynamoDB, AppSync, Cognito, S3,
            API Gateway, and AWS Amplify Gen 2 powered by CDK/SAM.
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
  );
}
