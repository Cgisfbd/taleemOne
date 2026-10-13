import { expect, test } from "@playwright/test";

test.describe("Splash to Login Transition Suite", () => {
  test("splash screen renders brand assets and crest", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "taleemOne ERP" })).toBeVisible();
    await expect(page.getByText("Powered by Barkat Tech")).toBeVisible();

    const crest = page.getByRole("img", { name: "taleemOne emerald and gold crest" });
    await expect(crest).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("clicking splash screen immediately navigates to /login", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "taleemOne ERP" })).toBeVisible();

    // Click anywhere on splash
    await page.locator("main").click();

    // Verify navigation to login
    await expect(page).toHaveURL(/\/login/, { timeout: 3000 });
    await expect(page.getByRole("heading", { name: "Institutional Sign In" })).toBeVisible();
  });

  test("pressing any key immediately skips to /login", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "taleemOne ERP" })).toBeVisible();

    // Press Enter or Space
    await page.keyboard.press("Enter");

    // Verify navigation to login
    await expect(page).toHaveURL(/\/login/, { timeout: 3000 });
    await expect(page.getByRole("heading", { name: "Institutional Sign In" })).toBeVisible();
  });

  test("auto-transitions to /login after splash duration", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "taleemOne ERP" })).toBeVisible();

    // Wait for auto-transition
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    await expect(page.getByRole("heading", { name: "Institutional Sign In" })).toBeVisible();
  });
});
