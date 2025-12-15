const { test, expect } = require("@playwright/test");

test("unauthenticated user is redirected to sign in", async ({ page }) => {
	await page.goto("/user/profile");

	await expect(page).toHaveURL(/\/user\/signin\?returnUrl=%2Fuser%2Fprofile/);

	await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
});
