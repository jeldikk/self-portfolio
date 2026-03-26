import Image from "next/image";
import { getImageFileUrl } from "@/utils/amplify.server";
import RotatingImages from "@/components/rotating-images/rotating-images.component";
import { Metadata } from "next";
import { META_DATA } from "@/utils/metadata.constants";
import Link from "next/link";

export const metadata: Metadata = META_DATA;

export default async function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen max-w-s">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <RotatingImages />
        </div>
        <div className="text-center">
          <h1 className="text-6xl font-bold lg:mb-24 mb-12">
            Hello <span className="text-6xl">👋</span>
          </h1>
          <h2 className="text-6xl font-bold">
            <span className="mr-3">
              ✋
              <Image
                src="/images/front-seeing.jpg"
                alt="hero page saying hello"
                width={75}
                height={75}
                className="rounded-full inline-block"
              />
            </span>
            Kamal Kumar
          </h2>
          <p className="py-6 text-lg max-w-2xl mx-auto text-base-content/80 leading-relaxed">
            A passionate Senior Software Engineer with 10+ years of experience
            specialized in crafting high-quality software solutions that drive
            innovation and deliver exceptional user experiences.
          </p>
          <div className="button-list flex flex-row gap-4 justify-center">
            <Link href="/blog" className="link link-hover" about="My Notes">
              My Notes
            </Link>
            <Link href="/about" className="link link-hover" about="About Me">
              About Me
            </Link>
            <Link
              href="/contact-me"
              className="link link-hover"
              about="Contact Me"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
