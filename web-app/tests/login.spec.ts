import { expect, test } from "@playwright/test";
import path from "path";
import fs from "fs";

const screenshotsDir = path.join(__dirname, "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const MOCK_INSTITUTE_PROFILE = {
  id: "inst-101",
  name: {
    en: "Markaz Al-Huda Educational Academy",
    ur: "مرکز الہدی ایجوکیشنل اکیڈمی",
    hi: "मरकज़ अल-हुदा एजुकेशनल एकेडमी",
  },
  logoUrl: null,
  dateFormat: "DD MMM YYYY",
  timezone: "Asia/Kolkata",
  currencySymbol: "₹",
  currencyCode: "INR",
};

for (const viewport of [
  { width: 1440, height: 900, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
]) {
  test(`login card responsive rendering at ${viewport.width}px (${viewport.name}) with dynamic backend API data`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    // Mock dynamic public institute profile endpoint (Zero hardcoding)
    await page.route("**/api/v1/institute-profile/public", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_INSTITUTE_PROFILE),
      });
    });

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/login");

    // Heading and Platform Attribution
    await expect(
      page.getByRole("heading", { name: "Institutional Sign In" })
    ).toBeVisible();

    await expect(page.getByText("Powered by Barkat Tech")).toBeVisible();

    // Primary Action Button
    await expect(
      page.getByRole("button", { name: "Authenticate & Continue" })
    ).toBeVisible();

    // Global Silk Canvas verification
    await expect(
      page.locator("svg path[stroke*='shared-silk-emerald']").first()
    ).toBeVisible();

    // Inputs verification
    const usernameInput = page.locator("input[name='identifier']");
    const passwordInput = page.locator("input[name='password']");
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // No horizontal scroll overflow
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
    ).toBe(true);

    expect(errors).toEqual([]);
    await page.screenshot({
      path: path.join(screenshotsDir, `login-${viewport.width}.png`),
      fullPage: true,
    });
  });
}

test("password visibility toggle works smoothly", async ({ page }) => {
  await page.goto("/login");
  const passwordInput = page.locator("input[name='password']");
  await passwordInput.fill("SecretPassword123");

  await expect(passwordInput).toHaveAttribute("type", "password");
  const toggleBtn = page.getByRole("button", { name: "Show password" });
  await toggleBtn.click();
  await expect(passwordInput).toHaveAttribute("type", "text");

  const hideBtn = page.getByRole("button", { name: "Hide password" });
  await hideBtn.click();
  await expect(passwordInput).toHaveAttribute("type", "password");
});

test("forgot password modal opens and closes with recovery instructions", async ({
  page,
}) => {
  await page.goto("/login");
  const forgotBtn = page.getByRole("button", { name: "Forgot Password?" });
  await forgotBtn.click();

  await expect(
    page.getByRole("heading", { name: "Password Recovery Assistance" })
  ).toBeVisible();
  await expect(
    page.getByText("Please contact your Super Administrator")
  ).toBeVisible();

  const understoodBtn = page.getByRole("button", { name: "Understood" });
  await understoodBtn.click();

  await expect(
    page.getByRole("heading", { name: "Password Recovery Assistance" })
  ).not.toBeVisible();
});

test("client-side validation displays error messages on empty submission", async ({
  page,
}) => {
  await page.goto("/login");
  const submitBtn = page.getByRole("button", { name: "Authenticate & Continue" });
  await submitBtn.click();

  await expect(
    page.getByText("Username or Email must be at least 3 characters")
  ).toBeVisible();
  await expect(
    page.getByText("Password must be at least 6 characters")
  ).toBeVisible();
});
