import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const capture = vi.fn();
  const formAction = vi.fn();
  const useActionState = vi.fn();
  const startTransition = vi.fn((callback: () => void) => callback());

  return {
    capture,
    formAction,
    useActionState,
    startTransition,
    posthog: { capture },
  };
});

vi.mock("posthog-js/react", () => ({
  usePostHog: () => mocks.posthog,
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useActionState: mocks.useActionState,
    startTransition: mocks.startTransition,
  };
});

import CreateContactForm from "@/components/contact-me/create-contact-form.component";

describe("CreateContactForm", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.posthog = { capture: mocks.capture };
    mocks.useActionState.mockReturnValue([
      {
        success: false,
        message: "",
        errors: null,
      },
      mocks.formAction,
      false,
    ]);
  });

  test("renders all core form controls", () => {
    render(<CreateContactForm />);

    expect(screen.getByPlaceholderText("Your Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Your Email")).toBeTruthy();
    expect(
      screen.getByPlaceholderText("Write your message here..."),
    ).toBeTruthy();
    expect(
      screen.getByRole("checkbox", {
        name: /yes, please send me an acknowledgement email/i,
      }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /send message/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /clear/i })).toBeTruthy();
  });

  test("submits form data and captures posthog event", () => {
    render(<CreateContactForm />);

    fireEvent.change(screen.getByPlaceholderText("Your Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Write your message here..."),
      {
        target: { value: "Hello from a unit test." },
      },
    );
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /yes, please send me an acknowledgement email/i,
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(mocks.startTransition).toHaveBeenCalledTimes(1);
    expect(mocks.formAction).toHaveBeenCalledTimes(1);

    const submittedFormData = mocks.formAction.mock.calls[0][0] as FormData;
    expect(submittedFormData.get("name")).toBe("Jane Doe");
    expect(submittedFormData.get("email")).toBe("jane@example.com");
    expect(submittedFormData.get("message")).toBe("Hello from a unit test.");
    expect(submittedFormData.get("acknowledge")).toBe("on");

    expect(mocks.capture).toHaveBeenCalledWith("contact_form_submitted", {
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello from a unit test.",
      acknowledge: "on",
    });
  });

  test("handles missing posthog instance without failing submit", () => {
    mocks.posthog = undefined;
    render(<CreateContactForm />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(mocks.formAction).toHaveBeenCalledTimes(1);
  });

  test("shows validation error summary and field messages", () => {
    mocks.useActionState.mockReturnValue([
      {
        success: false,
        message: "There were errors with your submission",
        errors: {
          email: ["Invalid email"],
          message: ["Message is required"],
        },
      },
      mocks.formAction,
      false,
    ]);

    render(<CreateContactForm />);

    expect(
      screen.getByText("There were errors with your submission"),
    ).toBeTruthy();
    expect(screen.getByText("Invalid email")).toBeTruthy();
    expect(screen.getByText("Message is required")).toBeTruthy();
  });

  test("shows loading spinner when submit is pending", () => {
    mocks.useActionState.mockReturnValue([
      {
        success: false,
        message: "",
        errors: null,
      },
      mocks.formAction,
      true,
    ]);

    render(<CreateContactForm />);

    expect(document.querySelector(".loading-spinner")).toBeTruthy();
  });
});
