import { describe, expect, test } from "vitest";
import { createContactMeSchema } from "@/schemas/contact-me.schemas";

describe("createContactMeSchema", () => {
  test("rejects email when format is invalid", () => {
    const inputData = {
      name: "John Doe",
      email: "invalid-email",
      message: "Hello, this is a test message.",
      wantAcknowledgement: true,
    };
    const result = createContactMeSchema.safeParse(inputData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  test("rejects submission when required fields are undefined", () => {
    const inputData = {
      name: undefined,
      email: undefined,
      message: undefined,
      wantAcknowledgement: true,
    };
    const result = createContactMeSchema.safeParse(inputData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  test("accepts valid input with acknowledgement request", () => {
    const inputData = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello, this is a test message.",
      wantAcknowledgement: true,
    };
    const result = createContactMeSchema.safeParse(inputData);

    expect(result.success).toBe(true);
  });

  test("accepts valid input without acknowledgement", () => {
    const inputData = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      message: "Test message",
      wantAcknowledgement: false,
    };
    const result = createContactMeSchema.safeParse(inputData);

    expect(result.success).toBe(true);
  });
});
