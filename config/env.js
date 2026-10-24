const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const trimTrailingSlash = (value) => (value ? value.replace(/\/+$/, '') : value);

const environment = {
  saucedemoUrl: trimTrailingSlash(process.env.SAUCEDEMO_URL),
  users: {
    sauceDemo: {
      standard: {
        username: process.env.SAUCEDEMO_STANDARD_USERNAME,
        password: process.env.SAUCEDEMO_STANDARD_PASSWORD,
      },
      invalid: {
        username: process.env.SAUCEDEMO_INVALID_USERNAME,
        password: process.env.SAUCEDEMO_INVALID_PASSWORD,
      },
    },
  },
};

module.exports = { environment };
