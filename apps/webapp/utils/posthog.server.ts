import { PostHog } from "posthog-node";

export const posthogClient = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN as string,
  {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
);

export async function shutdownPostHog() {
  await posthogClient.shutdown();
}
