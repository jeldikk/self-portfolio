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

  test("renders the 404 error badge", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeTruthy();
  });

  test("renders the page not found heading", () => {
    render(<NotFound />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Page not found",
    });
    expect(heading).toBeTruthy();
  });

  test("renders descriptive message for missing page", () => {
    render(<NotFound />);

    expect(
      screen.getByText(
        "The page you are trying to access does not exist in this app.",
      ),
    ).toBeTruthy();
  });

  test("renders confused image with correct attributes", () => {
    render(<NotFound />);

    const img = screen.getByRole("img", { name: "Not Found" });
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toBe("/images/confused.png");
    expect(img.getAttribute("alt")).toBe("Not Found");
  });

  test("applies rounded-full class to the image", () => {
    render(<NotFound />);

    const img = screen.getByRole("img", { name: "Not Found" });
    expect(img.getAttribute("class")).toContain("rounded-full");
  });

  test("renders home page navigation link", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Go to home" });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/");
  });

  test("home link has button styling classes", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Go to home" });
    const className = link.getAttribute("class") ?? "";

    expect(className).toContain("btn");
    expect(className).toContain("btn-primary");
  });

  test("renders all major page sections", () => {
    const { container } = render(<NotFound />);

    expect(screen.getByText("404")).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeTruthy();
    expect(screen.getByRole("img", { name: "Not Found" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Go to home" })).toBeTruthy();
  });
});
