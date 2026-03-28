import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("@aws-amplify/ui-react", () => ({
  Authenticator: () => <div data-testid="authenticator" />,
}));

import LoginComponent from "@/components/login/login.component";

describe("LoginComponent", () => {
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

  test("Authenticator is rendered inside the wrapper", () => {
    const { container } = render(<LoginComponent />);

    const wrapper = container.firstElementChild;
    const authenticator = screen.getByTestId("authenticator");
    expect(wrapper?.contains(authenticator)).toBe(true);
  });
});
