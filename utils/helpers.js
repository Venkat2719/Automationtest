const env = require('../config/env.js');
const users = env.environment.users;

async function loginAsStandardUser(loginPage) {
  await loginPage.goto();
  await loginPage.login(
    users.sauceDemo.standard.username,
    users.sauceDemo.standard.password
  );
}

module.exports = { loginAsStandardUser };
