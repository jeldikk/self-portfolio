import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const setTheme = vi.fn();
  const capture = vi.fn();
  const useTheme = vi.fn();
  const usePostHog = vi.fn();

  return {
    setTheme,
    capture,
    useTheme,
    usePostHog,
  };
});

vi.mock("next-themes", () => ({
  useTheme: mocks.useTheme,
}));

vi.mock("posthog-js/react", () => ({
  usePostHog: mocks.usePostHog,
}));

import ThemeSwitcher from "@/components/theme-switcher/theme-switcher.component";

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useTheme.mockReturnValue({
      theme: "light",
      setTheme: mocks.setTheme,
    });
    mocks.usePostHog.mockReturnValue({
      capture: mocks.capture,
    });
  });

  afterEach(() => {
    cleanup();
  });

  test("renders select with all expected theme options", () => {
    render(<ThemeSwitcher />);

    const select = screen.getByRole("combobox");
    expect(select).toBeTruthy();

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(8);

    expect(screen.getByRole("option", { name: "Select Theme" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Light" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Dark" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Cupcake" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Retro" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Cyberpunk" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Coffee" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "Caramel Latte" })).toBeTruthy();
  });

  test("binds select value to current theme", () => {
    mocks.useTheme.mockReturnValue({
      theme: "retro",
      setTheme: mocks.setTheme,
    });

    render(<ThemeSwitcher />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("retro");
  });

  test("changes theme and sends analytics event", () => {
    render(<ThemeSwitcher />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "dark" } });

    expect(mocks.setTheme).toHaveBeenCalledWith("dark");
    expect(mocks.capture).toHaveBeenCalledWith("theme_changed", {
      theme: "dark",
    });
  });

  test("applies expected styling classes", () => {
    render(<ThemeSwitcher />);

    const select = screen.getByRole("combobox");
    const className = select.getAttribute("class") || "";

    expect(className).toContain("select");
    expect(className).toContain("select-bordered");
    expect(className).toContain("select-sm");
  });
});
