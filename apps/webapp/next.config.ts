import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "amplify-packagesbackend-s-selfpublicbucketbucket4f-mafbosep4olc.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
