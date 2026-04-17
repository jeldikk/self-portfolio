"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { fadeUp } from "./variants.constants";

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="rounded-4xl border border-base-300/70 bg-base-200/55 p-8 shadow-xl backdrop-blur"
    >
      <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Connect
          </p>
          <p className="text-base text-base-content/75">
            Follow my work and reach out through professional platforms.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <Link
            href="https://github.com/jeldikk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline gap-2"
          >
            <svg
              className="h-4 w-4"
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
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/kamal-kumar-jeldi-7259b5203/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline gap-2"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.67H6.26V17H8.34M7.3 9.8A1.2 1.2 0 1 0 7.3 7.4A1.2 1.2 0 0 0 7.3 9.8M17.74 17V13.53C17.74 11.67 16.75 10.53 15.07 10.53C13.72 10.53 13.12 11.27 12.78 11.79V10.67H10.69V17H12.78V13.86C12.78 13.03 12.94 12.23 13.97 12.23C15 12.23 15.01 13.2 15.01 13.91V17H17.74Z" />
            </svg>
            LinkedIn
          </Link>
          <Link href="/contact-me" className="btn btn-primary gap-2">
            Contact Me
            <span className="badge badge-accent badge-sm">Responsive</span>
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
