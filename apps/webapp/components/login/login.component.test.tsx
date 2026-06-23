import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@aws-amplify/ui-react", () => ({
  Authenticator: () => <div data-testid="authenticator" />,
}));

import LoginComponent from "@/components/login/login.component";

describe("LoginComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders the Authenticator component", () => {
    render(<LoginComponent />);

    expect(screen.getByTestId("authenticator")).toBeTruthy();
  });

  test("renders the wrapper div with login-component class", () => {
    const { container } = render(<LoginComponent />);

    const wrapper = container.firstElementChild;
    expect(wrapper?.getAttribute("class")).toContain("login-component");
  });

  test("renders Authenticator inside the wrapper div", () => {
    const { container } = render(<LoginComponent />);

    const wrapper = container.firstElementChild;
    const authenticator = screen.getByTestId("authenticator");
    expect(wrapper?.contains(authenticator)).toBe(true);
  });

  test("maintains correct component hierarchy", () => {
    const { container } = render(<LoginComponent />);

    const wrapper = container.firstElementChild;
    expect(wrapper?.children.length).toBeGreaterThan(0);
  });
});
