import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

import RotatingImages from "@/components/rotating-images/rotating-images.component";

describe("RotatingImages", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  test("renders the first image on initial mount", () => {
    render(<RotatingImages />);

    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toBe("/images/eye-wink.png");
    expect(img.getAttribute("alt")).toBe("Image 1");
  });

  test("advances to the next image after 2000ms", () => {
    render(<RotatingImages />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toBe("/images/eyes-closed.png");
    expect(img.getAttribute("alt")).toBe("Image 2");
  });

  test("cycles through all images in order", () => {
    render(<RotatingImages />);

    const expectedSrcs = [
      "/images/eyes-closed.png",
      "/images/front-seeing.jpg",
      "/images/left-looking.png",
      "/images/right-looking.png",
    ];

    for (const src of expectedSrcs) {
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(screen.getByRole("img").getAttribute("src")).toBe(src);
    }
  });

  test("wraps back to the first image after the last image", () => {
    render(<RotatingImages />);

    act(() => {
      vi.advanceTimersByTime(2000 * 5); // 5 images -> back to index 0
    });

    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toBe("/images/eye-wink.png");
    expect(img.getAttribute("alt")).toBe("Image 1");
  });

  test("renders container with expected layout classes", () => {
    const { container } = render(<RotatingImages />);

    const wrapper = container.firstElementChild;
    const className = wrapper?.getAttribute("class") ?? "";
    expect(className).toContain("rotating-images");
    expect(className).toContain("relative");
  });

  test("renders image with rounded-full class", () => {
    render(<RotatingImages />);

    const img = screen.getByRole("img");
    expect(img.getAttribute("class")).toContain("rounded-full");
  });

  test("clears the interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = render(<RotatingImages />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledOnce();
  });
});
