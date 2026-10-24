const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { environment } = require('../../config/env');
const { users } = environment;

test.describe('Core Shopper Operations', () => {
  test('Sign in and handle invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Open a fresh signed-out session and verify the login form and demo credentials.
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.acceptedUsernames).toContainText('standard_user');
    await expect(loginPage.passwordHint).toContainText('secret_sauce');

    // 2. Submit invalid credentials and verify the authentication error.
    await loginPage.login(users.sauceDemo.invalid.username, users.sauceDemo.invalid.password);
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    await expect(page).toHaveURL(new URL('/', environment.saucedemoUrl).href);

    // 3. Sign in with valid credentials and verify the product catalog.
    await loginPage.login(users.sauceDemo.standard.username, users.sauceDemo.standard.password);
    await expect(page).toHaveURL(new URL('/inventory.html', environment.saucedemoUrl).href);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productItems).toHaveCount(6);
    await expect(inventoryPage.cartButton).toBeVisible();
  });
});