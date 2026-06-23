import { test, expect } from "@playwright/test";

test.describe("Example E2E Tests", () => {
  test("should load homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Portfolio|Home/);
  });

  test("should have navigation", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });
});
