const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { environment } = require('../../config/env');

test.describe('Smoke', () => {
  test('load login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL(new URL('/', environment.saucedemoUrl).href);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
