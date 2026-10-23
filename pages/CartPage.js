class CartPage {
  constructor(page) {
    this.page = page;
    this.cartHeading = page.getByText('Your Cart', { exact: true });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  productRow(name) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async removeProduct(name) {
    await this.productRow(name).getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };