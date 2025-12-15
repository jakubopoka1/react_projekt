const { test, expect } = require("@playwright/test");

test("has link to sign in page", async ({ page }) => {
	await page.goto("/");

	await page.locator('a[href="/user/signin"]').first().click();

	await expect(page).toHaveURL(/\/user\/signin$/);
	await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
});
