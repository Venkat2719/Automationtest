const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const environment = {
  saucedemoUrl: trimTrailingSlash(
    process.env.SAUCEDEMO_URL || 'https://www.saucedemo.com'
  ),
  orangehrmUrl: trimTrailingSlash(
    process.env.ORANGEHRM_URL || 'https://opensource-demo.orangehrmlive.com'
  ),
  playwrightUrl: process.env.PLAYWRIGHT_URL || 'https://playwright.dev/',
};

module.exports = { environment };
