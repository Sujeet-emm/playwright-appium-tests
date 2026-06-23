import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { Config } from './config/config';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: Config.retries,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: Config.baseUrl,
    trace: 'on-first-retry',
    actionTimeout: Config.timeout,
    navigationTimeout: Config.timeout,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: Config.browser.headless,
        actionTimeout: 30000,
        navigationTimeout: 30000,
      },
      timeout: 100000,
    },
  ],
});
