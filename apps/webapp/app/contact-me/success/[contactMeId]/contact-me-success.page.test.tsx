import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const isAuthenticated = vi.fn();
  const contactMeGet = vi.fn();
  const notFound = vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  });

  return {
    isAuthenticated,
    contactMeGet,
    notFound,
  };
});

vi.mock("@/utils/amplify.server", () => ({
  isAuthenticated: mocks.isAuthenticated,
  cookieBasedClient: {
    models: {
      ContactMe: {
        get: mocks.contactMeGet,
      },
    },
  },
}));

vi.mock("next/navigation", () => ({
  notFound: mocks.notFound,
}));

import ContactMeSuccessPage from "@/app/contact-me/success/[contactMeId]/page";

describe("ContactMeSuccessPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "dir").mockImplementation(() => undefined);
  });

  test("fetches record with iam mode for guests and renders core content", async () => {
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeGet.mockResolvedValue({
      data: {
        id: "abc-123",
        message: "hello",
        acknowledgedAt: null,
        acknowledged: false,
      },
    });

    const page = await ContactMeSuccessPage({
      params: Promise.resolve({ contactMeId: "abc-123" }),
    });
    render(page);

    expect(mocks.contactMeGet).toHaveBeenCalledWith(
      { id: "abc-123" },
      {
        selectionSet: ["id", "message", "acknowledgedAt", "acknowledged"],
        authMode: "iam",
      },
    );
    expect(screen.getByText("Thank you for your message")).toBeTruthy();
    expect(screen.getByText("abc-123")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Go to Home" }).getAttribute("href"),
    ).toBe("/");
    expect(
      screen
        .getByRole("link", { name: "Send Another Message" })
        .getAttribute("href"),
    ).toBe("/contact-me");
    expect(screen.queryByText(/Your message was acknowledged on/i)).toBeNull();
  });

  test("fetches record with userPool mode for authenticated users", async () => {
    mocks.isAuthenticated.mockResolvedValue(true);
    mocks.contactMeGet.mockResolvedValue({
      data: {
        id: "user-1",
        message: "hello",
        acknowledgedAt: null,
        acknowledged: false,
      },
    });

    const page = await ContactMeSuccessPage({
      params: Promise.resolve({ contactMeId: "user-1" }),
    });
    render(page);

    expect(mocks.contactMeGet).toHaveBeenCalledWith(
      { id: "user-1" },
      {
        selectionSet: ["id", "message", "acknowledgedAt", "acknowledged"],
        authMode: "userPool",
      },
    );
  });

  test("shows acknowledgement info when acknowledgedAt exists and acknowledged is true", async () => {
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeGet.mockResolvedValue({
      data: {
        id: "ack-1",
        message: "hello",
        acknowledgedAt: "2026-03-27T10:00:00.000Z",
        acknowledged: true,
      },
    });

    const page = await ContactMeSuccessPage({
      params: Promise.resolve({ contactMeId: "ack-1" }),
    });
    render(page);

    expect(screen.getByText(/Your message was acknowledged on/i)).toBeTruthy();
  });

  test("calls notFound when no data is returned", async () => {
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeGet.mockResolvedValue({
      data: null,
    });

    await expect(
      ContactMeSuccessPage({
        params: Promise.resolve({ contactMeId: "missing-id" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mocks.notFound).toHaveBeenCalledTimes(1);
  });
});
