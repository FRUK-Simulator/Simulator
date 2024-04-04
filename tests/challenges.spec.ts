import { test, expect } from "@playwright/test";

test("Challenges page should be rendered", async ({ page }) => {
  await page.goto("/lessons/1");
  await expect(page.getByRole("heading", { name: "Motors" })).toBeVisible();
});
