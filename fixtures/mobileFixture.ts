import { test as base } from '@playwright/test';
import { AppiumManager } from '../drivers/appiumManager';

type MobileFixtures = {
  appiumManager: AppiumManager;
};

export const test = base.extend<MobileFixtures>({
  appiumManager: async ({}, use) => {
    const manager = new AppiumManager();
    await manager.initialize();
    await use(manager);
    await manager.close();
  }
});
