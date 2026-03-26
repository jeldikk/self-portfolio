import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">About Me</h1>
      <div className="">
        <Image
          src="/images/under-construction.png"
          height={400}
          width={300}
          alt="Under Construction"
          className="mx-auto mt-10"
        />
        <p className="text-center mt-4 text-base-content/70">
          This page is currently under construction
        </p>
      </div>
    </div>
  );
}
