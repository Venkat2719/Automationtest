const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { ProductDetailsPage } = require('../../pages/ProductDetailsPage');
const { loginAsStandardUser } = require('../../utils/helpers');

test.describe('Core Shopper Operations', () => {
  test('Browse, sort, and inspect products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // 1. Sign in and verify the product catalog is available.
    await loginAsStandardUser(loginPage);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productItems).toHaveCount(6);
    await expect(inventoryPage.sortProducts).toBeVisible();

    // 2. Sort by price and verify the first and last products and prices.
    await inventoryPage.sortBy('Price (low to high)');
    await expect(inventoryPage.firstProductName).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.firstProductPrice).toHaveText('$7.99');
    await expect(inventoryPage.lastProductName).toHaveText('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.lastProductPrice).toHaveText('$49.99');

    // 3. Sort by descending name and inspect the Backpack details.
    await inventoryPage.sortBy('Name (Z to A)');
    await expect(inventoryPage.firstProductName).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(inventoryPage.lastProductName).toHaveText('Sauce Labs Backpack');
    await inventoryPage.openProduct('Sauce Labs Backpack');
    await expect(productDetailsPage.productName).toHaveText('Sauce Labs Backpack');
    await expect(productDetailsPage.productDescription).toContainText('sleek, streamlined Sly Pack');
    await expect(productDetailsPage.productPrice).toHaveText('$29.99');
    await expect(productDetailsPage.addToCartButton).toBeVisible();
    await expect(productDetailsPage.backToProductsButton).toBeVisible();

    // 4. Return to the catalog and verify it remains usable.
    await productDetailsPage.backToProducts();
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productItems).toHaveCount(6);
  });
});