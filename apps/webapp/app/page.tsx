import Image from "next/image";
import RotatingImages from "@/components/rotating-images/rotating-images.component";
import { Metadata } from "next";
import { META_DATA } from "@/utils/metadata.constants";
import Link from "next/link";

export const metadata: Metadata = META_DATA;

export default async function Home() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-10 md:px-10 md:py-14">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 rounded-4xl border border-base-300/70 bg-base-100/70 p-8 shadow-2xl backdrop-blur md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="order-2 flex justify-center lg:order-1">
          <div className="rounded-4xl border border-base-300/70 bg-base-200/60 p-4 shadow-inner">
            <RotatingImages />
          </div>
        </div>

        <div className="order-1 space-y-7 text-center lg:order-2 lg:text-left">
          <span className="badge badge-primary badge-outline badge-lg">
            Personal Portfolio
          </span>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Hello, I&apos;m Kamal Kumar.
          </h1>

          <h2 className="text-2xl font-semibold text-base-content/80 md:text-3xl">
            Senior Software Engineer building cloud-native web experiences.
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-8 text-base-content/75 lg:mx-0 lg:text-lg">
            I design and ship reliable fullstack products with React, Next.js,
            Node.js, Python, and AWS serverless architecture. This space
            captures my writing, background, and ways to connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/80 px-3 py-1 text-sm text-base-content/70">
              <Image
                src="/images/front-seeing.jpg"
                alt="Kamal Kumar profile"
                width={28}
                height={28}
                className="rounded-full"
              />
              Hyderabad, India
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/blog" className="btn btn-outline" aria-label="My Notes">
              My Notes
            </Link>
            <Link href="/about" className="btn btn-primary" aria-label="About Me">
              About Me
            </Link>
            <Link
              href="/contact-me"
              className="btn btn-ghost border border-base-300"
              aria-label="Contact Me"
            >
              Contact Me
            </Link>
          </div>

          <p className="text-sm text-base-content/55">
            10+ years in software engineering across fintech, enterprise
            platforms, and scientific systems.
          </p>
        </div>
      </section>
    </main>
  );
}
