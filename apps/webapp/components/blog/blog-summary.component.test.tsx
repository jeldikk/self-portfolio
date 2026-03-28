import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import BlogSummary from "@/components/blog/blog-summary.component";

describe("BlogSummary", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders title, description, and date", () => {
    render(
      <BlogSummary
        title="Getting Started with Amplify"
        description="A quick walkthrough for first-time setup."
        link="/blog/getting-started"
        date="2026-03-28"
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Getting Started with Amplify",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText("A quick walkthrough for first-time setup."),
    ).toBeTruthy();
    expect(screen.getByText("2026-03-28")).toBeTruthy();
  });

  test("renders read more anchor with provided href", () => {
    render(
      <BlogSummary
        title="State Management Patterns"
        description="Choosing the right approach for React apps."
        link="/blog/state-management-patterns"
        date="2026-03-20"
      />,
    );

    const link = screen.getByRole("link", { name: "Read more" });
    expect(link.getAttribute("href")).toBe("/blog/state-management-patterns");
  });

  test("applies expected utility classes for card and link", () => {
    const { container } = render(
      <BlogSummary
        title="Testing in Vitest"
        description="Build confidence with focused unit tests."
        link="/blog/testing-vitest"
        date="2026-03-10"
      />,
    );

    const card = container.firstElementChild;
    const link = screen.getByRole("link", { name: "Read more" });

    expect(card?.getAttribute("class") || "").toContain("shadow-md");
    expect(card?.getAttribute("class") || "").toContain("transition-shadow");
    expect(link.getAttribute("class") || "").toContain("text-blue-500");
    expect(link.getAttribute("class") || "").toContain("hover:underline");
  });

  test("renders user-facing strings with special characters", () => {
    render(
      <BlogSummary
        title="What's New in Next.js"
        description="Tips, tricks, and edge-cases you should know."
        link="/blog/nextjs-whats-new"
        date="Mar 28, 2026"
      />,
    );

    expect(screen.getByText("What's New in Next.js")).toBeTruthy();
    expect(
      screen.getByText("Tips, tricks, and edge-cases you should know."),
    ).toBeTruthy();
    expect(screen.getByText("Mar 28, 2026")).toBeTruthy();
  });
});
