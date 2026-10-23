# Playwright Test Framework

## Project structure

```text
config/       Environment-specific application URLs
data/         Reusable test data
fixtures/     Shared Playwright fixtures
pages/        Page Object Model classes
reports/      Generated HTML test reports
tests/
  api/        API tests
  smoke/      Quick health checks
  ui/         UI end-to-end tests
utils/        Shared test helpers
```

## Run tests

```bash
npm test
npm run test:ui
npm run test:smoke
npm run report:open
```

Set `SAUCEDEMO_URL`, `ORANGEHRM_URL`, or `PLAYWRIGHT_URL` to override the default application URLs.
`npm test` runs the full suite and writes an HTML report to `reports/html/`. Open it with `npm run report:open`. Playwright execution artifacts are written to `test-results/`.
