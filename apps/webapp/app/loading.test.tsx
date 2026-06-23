import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Loading from "@/app/loading";

describe("Loading", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders fullscreen centered container with flex layout", () => {
    const { container } = render(<Loading />);

    const wrapper = container.firstElementChild;
    const className = wrapper?.getAttribute("class") ?? "";

    expect(className).toContain("flex");
    expect(className).toContain("h-screen");
    expect(className).toContain("w-full");
    expect(className).toContain("items-center");
    expect(className).toContain("justify-center");
  });

  test("renders loading spinner element with correct styling", () => {
    const { container } = render(<Loading />);

    const spinner = container.querySelector("span");
    const className = spinner?.getAttribute("class") ?? "";

    expect(spinner).toBeTruthy();
    expect(className).toContain("loading");
    expect(className).toContain("loading-bars");
    expect(className).toContain("loading-xl");
  });

  test("spinner is child of the main container", () => {
    const { container } = render(<Loading />);

    const wrapper = container.firstElementChild;
    const spinner = wrapper?.querySelector("span");

    expect(spinner).toBeTruthy();
  });

  test("applies all required accessibility and layout classes", () => {
    const { container } = render(<Loading />);

    const wrapper = container.firstElementChild;
    const className = wrapper?.getAttribute("class") ?? "";

    const requiredClasses = [
      "flex",
      "h-screen",
      "w-full",
      "items-center",
      "justify-center",
    ];
    for (const cls of requiredClasses) {
      expect(className).toContain(cls);
    }
  });
});
