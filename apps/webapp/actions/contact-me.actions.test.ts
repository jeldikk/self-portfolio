import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const safeParse = vi.fn();
  const contactMeMutation = vi.fn();
  const isAuthenticated = vi.fn();
  const redirect = vi.fn();

  return {
    safeParse,
    contactMeMutation,
    isAuthenticated,
    redirect,
  };
});

vi.mock("@/schemas/contact-me.schemas", () => ({
  createContactMeSchema: {
    safeParse: mocks.safeParse,
  },
}));

vi.mock("@/utils/amplify.server", () => ({
  cookieBasedClient: {
    mutations: {
      ContactMeMutation: mocks.contactMeMutation,
    },
  },
  isAuthenticated: mocks.isAuthenticated,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.redirect,
}));

import {
  createContactMeAction,
  type CreateFormState,
} from "@/actions/contact-me.actions";

function buildFormData(input: {
  name?: string;
  email?: string;
  message?: string;
  acknowledge?: boolean;
}) {
  const formData = new FormData();

  if (input.name !== undefined) {
    formData.set("name", input.name);
  }

  if (input.email !== undefined) {
    formData.set("email", input.email);
  }

  if (input.message !== undefined) {
    formData.set("message", input.message);
  }

  if (input.acknowledge) {
    formData.set("acknowledge", "on");
  }

  return formData;
}

describe("createContactMeAction", () => {
  const initialState: CreateFormState = {
    success: false,
    message: "",
    errors: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "dir").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns validation errors when schema parsing fails", async () => {
    mocks.safeParse.mockReturnValue({
      success: false,
      error: {
        flatten: () => ({
          fieldErrors: {
            email: ["Invalid email"],
          },
        }),
      },
    });

    const result = await createContactMeAction(
      initialState,
      buildFormData({
        name: "Jane",
        email: "invalid",
        message: "Hello",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "There were errors with your submission",
      errors: {
        email: ["Invalid email"],
      },
    });
    expect(mocks.contactMeMutation).not.toHaveBeenCalled();
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  test("returns email error when acknowledgement is requested without email", async () => {
    mocks.safeParse.mockReturnValue({
      success: true,
      data: {
        name: "Jane",
        email: undefined,
        message: "Hello",
        wantAcknowledgement: true,
      },
    });

    const result = await createContactMeAction(
      initialState,
      buildFormData({
        name: "Jane",
        message: "Hello",
        acknowledge: true,
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "There are errors with your submission",
      errors: {
        email: ["Want Acknowledgement is checked but email is missing."],
      },
    });
    expect(mocks.contactMeMutation).not.toHaveBeenCalled();
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  test("uses guest auth mode and default sender/email values", async () => {
    mocks.safeParse.mockReturnValue({
      success: true,
      data: {
        name: undefined,
        email: undefined,
        message: "Guest message",
        wantAcknowledgement: false,
      },
    });
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeMutation.mockResolvedValue({
      data: {
        id: "guest-123",
      },
    });

    const result = await createContactMeAction(
      initialState,
      buildFormData({
        message: "Guest message",
      }),
    );

    expect(result).toBeUndefined();
    expect(mocks.contactMeMutation).toHaveBeenCalledWith(
      {
        name: "anonymous sender",
        email: "undisclosed@example.com",
        message: "Guest message",
        wantAcknowledgement: false,
      },
      {
        authMode: "iam",
      },
    );
    expect(mocks.redirect).toHaveBeenCalledWith(
      "/contact-me/success/guest-123",
    );
  });

  test("uses userPool auth mode when user is authenticated", async () => {
    mocks.safeParse.mockReturnValue({
      success: true,
      data: {
        name: "John",
        email: "john@example.com",
        message: "Authenticated message",
        wantAcknowledgement: true,
      },
    });
    mocks.isAuthenticated.mockResolvedValue(true);
    mocks.contactMeMutation.mockResolvedValue({
      data: {
        id: "user-123",
      },
    });

    const result = await createContactMeAction(
      initialState,
      buildFormData({
        name: "John",
        email: "john@example.com",
        message: "Authenticated message",
        acknowledge: true,
      }),
    );

    expect(result).toBeUndefined();
    expect(mocks.contactMeMutation).toHaveBeenCalledWith(
      {
        name: "John",
        email: "john@example.com",
        message: "Authenticated message",
        wantAcknowledgement: true,
      },
      {
        authMode: "userPool",
      },
    );
    expect(mocks.redirect).toHaveBeenCalledWith("/contact-me/success/user-123");
  });

  test("returns general error when mutation throws", async () => {
    mocks.safeParse.mockReturnValue({
      success: true,
      data: {
        name: "Jane",
        email: "jane@example.com",
        message: "Hi",
        wantAcknowledgement: true,
      },
    });
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeMutation.mockRejectedValue(new Error("network error"));

    const result = await createContactMeAction(
      initialState,
      buildFormData({
        name: "Jane",
        email: "jane@example.com",
        message: "Hi",
        acknowledge: true,
      }),
    );

    expect(result).toEqual({
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
      errors: {
        general: ["Failed to send message. Please try again later."],
      },
    });
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  test("returns error when mutation succeeds without an id", async () => {
    mocks.safeParse.mockReturnValue({
      success: true,
      data: {
        name: "Jane",
        email: "jane@example.com",
        message: "Hi",
        wantAcknowledgement: false,
      },
    });
    mocks.isAuthenticated.mockResolvedValue(false);
    mocks.contactMeMutation.mockResolvedValue({
      data: {},
    });

    const result = await createContactMeAction(
      initialState,
      buildFormData({
        name: "Jane",
        email: "jane@example.com",
        message: "Hi",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Message was created but no record id was returned.",
      errors: {
        general: ["Missing record id in response."],
      },
    });
    expect(mocks.redirect).not.toHaveBeenCalled();
  });
});
