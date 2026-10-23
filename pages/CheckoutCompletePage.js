class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.confirmationMessage = page.getByText(/Your order has been dispatched/);
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}

module.exports = { CheckoutCompletePage };