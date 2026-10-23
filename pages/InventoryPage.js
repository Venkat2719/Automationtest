class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsHeading = page.getByText('Products', { exact: true });
    this.productItems = page.locator('.inventory_item');
    this.sortProducts = page.getByRole('combobox', { name: 'Sort products' });
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.firstProductName = this.productItems.first().locator('.inventory_item_name');
    this.firstProductPrice = this.productItems.first().locator('.inventory_item_price');
    this.lastProductName = this.productItems.last().locator('.inventory_item_name');
    this.lastProductPrice = this.productItems.last().locator('.inventory_item_price');
  }

  productCard(name) {
    return this.productItems.filter({ hasText: name });
  }

  productAction(name) {
    return this.productCard(name).getByRole('button', { name: /Add to cart|Remove/ });
  }

  async sortBy(label) {
    await this.sortProducts.selectOption({ label });
  }

  async openProduct(name) {
    await this.productCard(name)
      .getByRole('button', { name: `View details for ${name}` })
      .first()
      .click();
  }

  async addProductToCart(name) {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}

module.exports = { InventoryPage };