import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/faa_part_107_study_website",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
