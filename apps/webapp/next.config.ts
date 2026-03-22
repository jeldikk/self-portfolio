import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import config from "@/amplify_outputs.json";

const publicImageBucket = config.storage.buckets.find(
  (bucket) => bucket.name === "self-public",
);
const hostName = `${publicImageBucket?.bucket_name}.s3.${publicImageBucket?.aws_region}.amazonaws.com`;

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostName!,
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
