import test, { expect } from "@playwright/test";

const { describe, beforeEach } = test;

describe("Given the browser is in default size, when load home page", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("There should be two sections each for students and teachers", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Play", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Teach", exact: true }),
    ).toBeVisible();
  });
});

describe("Given the browser is in mobile size, when load home page", () => {
  beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    await page.goto("/");
  });

  test("The teacher section should start in a new row after student section", async ({
    page,
  }) => {
    const playBlock = page.getByRole("heading", {
      name: "Play",
      exact: true,
    });
    const teachBlock = page.getByRole("heading", {
      name: "Teach",
      exact: true,
    });

    await expect(playBlock).toBeVisible();
    await expect(teachBlock).toBeVisible();

    const playBlockRect = await playBlock.boundingBox();
    const teachBlockRect = await teachBlock.boundingBox();

    expect(playBlockRect?.y).toBeLessThan(teachBlockRect?.y ?? 0);
  });
});
