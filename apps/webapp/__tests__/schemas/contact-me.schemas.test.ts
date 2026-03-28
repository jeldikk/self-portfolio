import { describe, expect, test } from "vitest";
import { createContactMeSchema } from "@/schemas/contact-me.schemas";

describe("createContactMeSchema Test suite", () => {
  test("Invalid Email input data", () => {
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

  test("Invalid Name, Email and Message undefined Input data", () => {
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

  test("valid input with acknowledgement", () => {
    const inputData = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello, this is a test message.",
      wantAcknowledgement: true,
    };
    const result = createContactMeSchema.safeParse(inputData);

    expect(result.success).toBe(true);
  });
});
