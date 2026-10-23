const { environment } = require('../config/env');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.acceptedUsernames = page.getByText(/standard_user/);
    this.passwordHint = page.getByText('Password for all users:').locator('..');
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto(environment.saucedemoUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };