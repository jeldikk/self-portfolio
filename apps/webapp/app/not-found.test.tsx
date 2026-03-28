import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    width,
    height,
  }: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  ),
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

import NotFound from "@/app/not-found";

describe("NotFound", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders the 404 badge", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeTruthy();
  });

  test("renders the page not found heading", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeTruthy();
  });

  test("renders the descriptive message", () => {
    render(<NotFound />);

    expect(
      screen.getByText(
        "The page you are trying to access does not exist in this app.",
      ),
    ).toBeTruthy();
  });

  test("renders the confused image with correct src and alt", () => {
    render(<NotFound />);

    const img = screen.getByRole("img", { name: "Not Found" });
    expect(img.getAttribute("src")).toBe("/images/confused.png");
    expect(img.getAttribute("alt")).toBe("Not Found");
  });

  test("renders the confused image with rounded-full class", () => {
    render(<NotFound />);

    const img = screen.getByRole("img", { name: "Not Found" });
    expect(img.getAttribute("class")).toContain("rounded-full");
  });

  test("renders a link to the home page", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Go to home" });
    expect(link.getAttribute("href")).toBe("/");
  });

  test("home link has the correct button classes", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Go to home" });
    const className = link.getAttribute("class") ?? "";
    expect(className).toContain("btn");
    expect(className).toContain("btn-primary");
  });
});
