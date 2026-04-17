"use client";

import { motion } from "motion/react";
import { stagger, fadeUp } from "./variants.constants";

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

export default function Education() {
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
                <p className="text-base-content/70">{entry.qualification}</p>
              </div>
              <span className="badge badge-outline">{entry.location}</span>
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
  );
}
