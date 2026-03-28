import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const ORIGINAL_GOOGLE_SITE_VERIFICATION_ID =
  process.env.GOOGLE_SITE_VERIFICATION_ID;
const ORIGINAL_NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const loadMetadata = async () => {
  const module = await import("@/utils/metadata.constants");
  return module.META_DATA;
};

describe("META_DATA", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();

    if (ORIGINAL_GOOGLE_SITE_VERIFICATION_ID === undefined) {
      delete process.env.GOOGLE_SITE_VERIFICATION_ID;
    } else {
      process.env.GOOGLE_SITE_VERIFICATION_ID =
        ORIGINAL_GOOGLE_SITE_VERIFICATION_ID;
    }

    if (ORIGINAL_NEXT_PUBLIC_SITE_URL === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_NEXT_PUBLIC_SITE_URL;
    }
  });

  test("contains expected static metadata fields", async () => {
    const metadata = await loadMetadata();

    expect(metadata.title).toBe(
      "Kamal Kumar Jeldi | Senior MERN Full Stack Developer.",
    );
    expect(metadata.description).toContain("10+ years of experience");
    expect(metadata.keywords).toContain("TypeScript");

    if (typeof metadata.robots !== "string" && metadata.robots) {
      expect(metadata.robots.index).toBe(true);
      expect(metadata.robots.follow).toBe(true);
    }

    expect(metadata.openGraph?.siteName).toBe("jeldikk.fyi");
    expect(metadata.openGraph?.locale).toBe("en_US");

    if (metadata.openGraph && "type" in metadata.openGraph) {
      expect(metadata.openGraph.type).toBe("website");
    }

    expect(metadata.openGraph?.countryName).toBe("India");
  });

  test("maps env vars into verification and openGraph url", async () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION_ID", "google-verification-123");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://jeldikk.fyi");

    const metadata = await loadMetadata();

    expect(metadata.verification?.google).toBe("google-verification-123");
    expect(metadata.openGraph?.url).toBe("https://jeldikk.fyi");
  });

  test("keeps env-driven fields undefined when env vars are absent", async () => {
    delete process.env.GOOGLE_SITE_VERIFICATION_ID;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const metadata = await loadMetadata();

    expect(metadata.verification?.google).toBeUndefined();
    expect(metadata.openGraph?.url).toBeUndefined();
  });
});
