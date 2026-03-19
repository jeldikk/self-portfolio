import type { NextConfig } from "next";
import config from "@/amplify_outputs.json";

const publicImageBucket = config.storage.buckets.find(
  (bucket) => bucket.name === "self-public",
);
const hostName = `${publicImageBucket?.bucket_name}.s3.${publicImageBucket?.aws_region}.amazonaws.com`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostName!,
      },
    ],
  },
};

export default nextConfig;
