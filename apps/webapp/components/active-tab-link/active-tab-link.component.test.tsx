import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const usePathname = vi.fn();
  return { usePathname };
});

vi.mock("next/navigation", () => ({
  usePathname: mocks.usePathname,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    className,
    children,
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import ActiveTabLink from "@/components/active-tab-link/active-tab-link.component";

describe("ActiveTabLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders child content and href attribute", () => {
    mocks.usePathname.mockReturnValue("/");

    render(
      <ActiveTabLink href="/about" className="tab">
        About
      </ActiveTabLink>,
    );

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/about");
    expect(link.getAttribute("class")).toContain("tab");
  });

  test("applies tab-active class when pathname matches href", () => {
    mocks.usePathname.mockReturnValue("/about");

    render(
      <ActiveTabLink href="/about" className="tab">
        About
      </ActiveTabLink>,
    );

    const link = screen.getByRole("link", { name: "About" });
    const className = link.getAttribute("class") || "";

    expect(className).toContain("tab");
    expect(className).toContain("tab-active");
  });

  test("does not apply tab-active class when pathname does not match href", () => {
    mocks.usePathname.mockReturnValue("/blog");

    render(
      <ActiveTabLink href="/about" className="tab">
        About
      </ActiveTabLink>,
    );

    const link = screen.getByRole("link", { name: "About" });
    const className = link.getAttribute("class") || "";

    expect(className).toContain("tab");
    expect(className).not.toContain("tab-active");
  });

  test("renders with active class when pathname is root and href is root", () => {
    mocks.usePathname.mockReturnValue("/");

    render(
      <ActiveTabLink href="/" className="tab">
        Home
      </ActiveTabLink>,
    );

    const link = screen.getByRole("link", { name: "Home" });
    const className = link.getAttribute("class") || "";

    expect(className).toContain("tab-active");
  });

  test("renders without className when omitted", () => {
    mocks.usePathname.mockReturnValue("/about");

    render(<ActiveTabLink href="/about">About</ActiveTabLink>);

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/about");
    expect((link.getAttribute("class") || "").includes("tab-active")).toBe(
      true,
    );
  });

  test("handles nested routes correctly", () => {
    mocks.usePathname.mockReturnValue("/blog/article");

    render(
      <ActiveTabLink href="/blog" className="tab">
        Blog
      </ActiveTabLink>,
    );

    const link = screen.getByRole("link", { name: "Blog" });
    const className = link.getAttribute("class") || "";

    expect(className).toContain("tab");
  });
});
