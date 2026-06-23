import dotenv from 'dotenv';

dotenv.config();

export const Config = {
  baseUrl: process.env.BASE_URL ?? 'https://account.seqrite.com/cas/login',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://api.example.com',
  timeout: 100000,
  retries: process.env.CI ? 2 : 0,
  browser: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: Number(process.env.SLOW_MO ?? 0),
  },
  appium: {
    hostname: process.env.APPIUM_HOST ?? 'localhost',
    port: Number(process.env.APPIUM_PORT ?? 4723),
    defaultCapabilities: {
      platformName: 'Android',
      deviceName: process.env.DEVICE_NAME ?? 'emulator-5554',
      app: process.env.APP_PATH ?? '/path/to/app.apk',
    }
  }
};