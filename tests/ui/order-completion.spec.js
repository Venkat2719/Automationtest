const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutInformationPage } = require('../../pages/CheckoutInformationPage');
const { CheckoutOverviewPage } = require('../../pages/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../../pages/CheckoutCompletePage');
const { loginAsStandardUser } = require('../../utils/helpers');

test.describe('Core Shopper Operations', () => {
  test('Review and place an order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // 1. Sign in, add one Backpack, and complete checkout information.
    await loginAsStandardUser(loginPage);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutInformationPage.fillCustomerInformation('Taylor', 'Tester', '10001');
    await checkoutInformationPage.continue();

    // 2. Review the order and verify its item, payment, shipping, and totals.
    await expect(checkoutOverviewPage.heading).toBeVisible();
    await expect(checkoutOverviewPage.productRow('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(checkoutOverviewPage.paymentInformation).toBeVisible();
    await expect(checkoutOverviewPage.shippingInformation).toBeVisible();
    await expect(checkoutOverviewPage.itemTotal).toBeVisible();
    await expect(checkoutOverviewPage.tax).toBeVisible();
    await expect(checkoutOverviewPage.total).toBeVisible();

    // 3. Finish the order and verify the confirmation and cleared cart.
    await checkoutOverviewPage.finish();
    await expect(checkoutCompletePage.heading).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.confirmationMessage).toContainText('Your order has been dispatched');
    await expect(checkoutCompletePage.cartButton).toHaveAccessibleName('Cart, empty');

    // 4. Return home and verify the catalog is available with an empty cart.
    await checkoutCompletePage.backHome();
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productItems).toHaveCount(6);
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, empty');
  });
});