import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const runWithAmplifyServerContext = vi.fn();
  const createServerRunner = vi.fn(() => ({
    runWithAmplifyServerContext,
  }));

  const cookieBasedClient = {
    mutations: {},
    queries: {},
  };

  const reqBasedClient = {
    mutations: {},
    queries: {},
  };

  const generateServerClientUsingCookies = vi.fn(() => cookieBasedClient);
  const generateServerClientUsingReqRes = vi.fn(() => reqBasedClient);

  const cookies = vi.fn(() => "cookie-store");
  const getCurrentUser = vi.fn();
  const fetchAuthSession = vi.fn();
  const fetchUserAttributes = vi.fn();
  const getUrl = vi.fn();

  return {
    runWithAmplifyServerContext,
    createServerRunner,
    generateServerClientUsingCookies,
    generateServerClientUsingReqRes,
    cookieBasedClient,
    reqBasedClient,
    cookies,
    getCurrentUser,
    fetchAuthSession,
    fetchUserAttributes,
    getUrl,
  };
});

vi.mock("@aws-amplify/adapter-nextjs", () => ({
  createServerRunner: mocks.createServerRunner,
}));

vi.mock("@aws-amplify/adapter-nextjs/data", () => ({
  generateServerClientUsingCookies: mocks.generateServerClientUsingCookies,
  generateServerClientUsingReqRes: mocks.generateServerClientUsingReqRes,
}));

vi.mock("next/headers", () => ({
  cookies: mocks.cookies,
}));

vi.mock("aws-amplify/auth/server", () => ({
  getCurrentUser: mocks.getCurrentUser,
  fetchAuthSession: mocks.fetchAuthSession,
  fetchUserAttributes: mocks.fetchUserAttributes,
}));

vi.mock("aws-amplify/storage/server", () => ({
  getUrl: mocks.getUrl,
}));

import {
  cookieBasedClient,
  getAuthUserDetails,
  getImageFileUrl,
  isAuthenticated,
  reqBasedClient,
} from "@/utils/amplify.server";

describe("amplify.server", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.runWithAmplifyServerContext.mockImplementation(
      async ({ operation }: { operation: (contextSpec: unknown) => unknown }) =>
        operation({ token: "ctx" }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("creates and exports server clients", async () => {
    vi.resetModules();
    vi.clearAllMocks();

    const mod = await import("@/utils/amplify.server");

    expect(mocks.generateServerClientUsingCookies).toHaveBeenCalledOnce();
    expect(mocks.generateServerClientUsingReqRes).toHaveBeenCalledOnce();
    expect(mod.cookieBasedClient).toBe(mocks.cookieBasedClient);
    expect(mod.reqBasedClient).toBe(mocks.reqBasedClient);
  });

  test("getAuthUserDetails returns admin user details when user is in ADMIN group", async () => {
    mocks.getCurrentUser.mockResolvedValue({ username: "kamal" });
    mocks.fetchAuthSession.mockResolvedValue({
      tokens: {
        accessToken: {
          payload: {
            "cognito:groups": "ADMIN,USER",
          },
        },
      },
    });
    mocks.fetchUserAttributes.mockResolvedValue({ email: "kamal@example.com" });

    const result = await getAuthUserDetails();

    expect(mocks.getCurrentUser).toHaveBeenCalledOnce();
    expect(mocks.fetchAuthSession).toHaveBeenCalledOnce();
    expect(mocks.fetchUserAttributes).toHaveBeenCalledOnce();
    expect(result).toEqual({
      isAdmin: true,
      authUser: { username: "kamal" },
    });
  });

  test("getAuthUserDetails returns non-admin when ADMIN group is missing", async () => {
    mocks.getCurrentUser.mockResolvedValue({ username: "kamal" });
    mocks.fetchAuthSession.mockResolvedValue({
      tokens: {
        accessToken: {
          payload: {
            "cognito:groups": "USER",
          },
        },
      },
    });
    mocks.fetchUserAttributes.mockResolvedValue({});

    const result = await getAuthUserDetails();

    expect(result).toEqual({
      isAdmin: false,
      authUser: { username: "kamal" },
    });
  });

  test("getAuthUserDetails returns default guest details when context call fails", async () => {
    mocks.runWithAmplifyServerContext.mockRejectedValue(
      new Error("auth failed"),
    );

    const result = await getAuthUserDetails();

    expect(result).toEqual({
      isAdmin: false,
      authUser: null,
    });
  });

  test("isAuthenticated returns true when session has tokens", async () => {
    mocks.fetchAuthSession.mockResolvedValue({
      tokens: {
        accessToken: {
          payload: {},
        },
      },
    });

    const result = await isAuthenticated();

    expect(result).toBe(true);
  });

  test("isAuthenticated returns false when session has no tokens", async () => {
    mocks.fetchAuthSession.mockResolvedValue({
      tokens: undefined,
    });

    const result = await isAuthenticated();

    expect(result).toBe(false);
  });

  test("isAuthenticated returns false and logs error when context call fails", async () => {
    const consoleLogSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);
    mocks.runWithAmplifyServerContext.mockRejectedValue(
      new Error("session failed"),
    );

    const result = await isAuthenticated();

    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledOnce();
  });

  test("getImageFileUrl returns url details with expected options", async () => {
    const fileUrlResponse = {
      url: "https://example.com/profile.jpg",
      expiresAt: new Date("2026-01-01T00:00:00.000Z"),
    };
    mocks.getUrl.mockResolvedValue(fileUrlResponse);

    const result = await getImageFileUrl("profile.jpg");

    expect(result).toBe(fileUrlResponse);
    expect(mocks.getUrl).toHaveBeenCalledWith(
      { token: "ctx" },
      {
        path: "profile.jpg",
        options: {
          bucket: "self-public",
          validateObjectExistence: true,
          expiresIn: 3000,
        },
      },
    );
  });

  test("getImageFileUrl rethrows when context call fails", async () => {
    const error = new Error("storage failed");
    mocks.runWithAmplifyServerContext.mockRejectedValue(error);

    await expect(getImageFileUrl("missing.jpg")).rejects.toThrow(
      "storage failed",
    );
  });
});
