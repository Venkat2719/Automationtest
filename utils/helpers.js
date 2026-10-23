const { users } = require('../data/users.json');

async function loginAsStandardUser(loginPage) {
  await loginPage.goto();
  await loginPage.login(
    users.sauceDemo.standard.username,
    users.sauceDemo.standard.password
  );
}

module.exports = { loginAsStandardUser };
