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

  test("fetches record with iam auth mode for unauthenticated users", async () => {
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
  });

  test("renders home and contact form navigation links", async () => {
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

    const homeLinks = screen.getAllByRole("link", { name: "Go to Home" });
    const contactLinks = screen.getAllByRole("link", {
      name: "Send Another Message",
    });

    expect(homeLinks.length).toBeGreaterThan(0);
    expect(homeLinks[0].getAttribute("href")).toBe("/");
    expect(contactLinks[0].getAttribute("href")).toBe("/contact-me");
  });

  test("does not display acknowledgement message when not acknowledged", async () => {
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

    expect(screen.queryByText(/Your message was acknowledged on/i)).toBeNull();
  });

  test("fetches record with userPool auth mode for authenticated users", async () => {
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

  test("displays acknowledgement message when message was acknowledged", async () => {
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

  test("throws NEXT_NOT_FOUND when contact record is not found", async () => {
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

  test("uses correct query selection set for fetching record", async () => {
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeGet.mockResolvedValue({
      data: {
        id: "test-id",
        message: "test",
        acknowledgedAt: null,
        acknowledged: false,
      },
    });

    await ContactMeSuccessPage({
      params: Promise.resolve({ contactMeId: "test-id" }),
    });

    const callArgs = mocks.contactMeGet.mock.calls[0];
    expect(callArgs[1].selectionSet).toEqual([
      "id",
      "message",
      "acknowledgedAt",
      "acknowledged",
    ]);
  });
});
