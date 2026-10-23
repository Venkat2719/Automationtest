const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { loginAsStandardUser } = require('../../utils/helpers');

test.describe('Core Shopper Operations', () => {
  test('Manage the shopping cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. Sign in and verify the cart starts empty.
    await loginAsStandardUser(loginPage);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, empty');

    // 2. Add the Backpack and Onesie; verify their controls and cart count.
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await expect(inventoryPage.productAction('Sauce Labs Backpack')).toHaveText('Remove');
    await expect(inventoryPage.productAction('Sauce Labs Onesie')).toHaveText('Remove');
    await expect(inventoryPage.cartButton).toContainText('2');

    // 3. Open the cart and verify both product lines and shopping actions.
    await inventoryPage.openCart();
    await expect(cartPage.cartHeading).toBeVisible();
    await expect(cartPage.productRow('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(cartPage.productRow('Sauce Labs Backpack').getByText('1', { exact: true })).toBeVisible();
    await expect(cartPage.productRow('Sauce Labs Onesie')).toContainText('$7.99');
    await expect(cartPage.productRow('Sauce Labs Onesie').getByText('1', { exact: true })).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();

    // 4. Remove the Backpack and verify the Onesie remains.
    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.productRow('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.productRow('Sauce Labs Onesie')).toContainText('$7.99');
    await expect(inventoryPage.cartButton).toContainText('1');

    // 5. Continue shopping, reopen the cart, and verify the remaining item persisted.
    await cartPage.continueShopping();
    await expect(inventoryPage.productsHeading).toBeVisible();
    await inventoryPage.openCart();
    await expect(cartPage.productRow('Sauce Labs Onesie')).toContainText('$7.99');
    await expect(cartPage.productRow('Sauce Labs Backpack')).toHaveCount(0);
    await expect(inventoryPage.cartButton).toContainText('1');
  });
});