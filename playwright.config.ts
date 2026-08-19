// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Per-test timeout — raised so 2s slowMo runs have enough headroom */
  timeout: 120_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['html'],
  ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Let the browser use the full window size instead of a 1280x720 viewport */
    viewport: null,

    screenshot: 'only-on-failure',    //Capture screenshots only on failure

    launchOptions: {
      /* Open the browser maximized on headed runs */
      args: ['--start-maximized'],
      /* Slow every action so headed runs are watchable */
      //slowMo: 1000,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    /* Using system-installed browsers (no Playwright download required) */
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge', viewport: null, deviceScaleFactor: undefined },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: null, deviceScaleFactor: undefined },
    },

    /* Downloaded Playwright browsers — enable after `npx playwright install` succeeds */
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

