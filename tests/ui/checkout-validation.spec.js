const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutInformationPage } = require('../../pages/CheckoutInformationPage');
const { CheckoutOverviewPage } = require('../../pages/CheckoutOverviewPage');
const { loginAsStandardUser } = require('../../utils/helpers');

test.describe('Core Shopper Operations', () => {
  test('Validate checkout information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    // 1. Sign in, add the Backpack, and verify the cart before checkout.
    await loginAsStandardUser(loginPage);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(cartPage.productRow('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(cartPage.checkoutButton).toBeVisible();

    // 2. Submit the checkout information form empty and verify First Name validation.
    await cartPage.checkout();
    await expect(checkoutInformationPage.heading).toBeVisible();
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('First Name is required');
    await expect(checkoutInformationPage.heading).toBeVisible();

    // 3. Verify Last Name and ZIP/postal code are independently required.
    await checkoutInformationPage.fillFirstName('Taylor');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Last Name is required');
    await checkoutInformationPage.fillLastName('Tester');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Postal Code is required');
    await expect(checkoutInformationPage.heading).toBeVisible();

    // 4. Complete the required information and verify the order overview.
    await checkoutInformationPage.fillPostalCode('10001');
    await checkoutInformationPage.continue();
    await expect(checkoutOverviewPage.heading).toBeVisible();
    await expect(checkoutOverviewPage.productRow('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(checkoutOverviewPage.paymentInformation).toBeVisible();
    await expect(checkoutOverviewPage.shippingInformation).toBeVisible();
    await expect(checkoutOverviewPage.itemTotal).toBeVisible();
    await expect(checkoutOverviewPage.tax).toBeVisible();
    await expect(checkoutOverviewPage.total).toBeVisible();
    await expect(checkoutOverviewPage.cancelButton).toBeVisible();
    await expect(checkoutOverviewPage.finishButton).toBeVisible();
  });
});