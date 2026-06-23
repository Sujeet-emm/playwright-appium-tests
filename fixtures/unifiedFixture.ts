import { test as base } from '@playwright/test';
import { AppiumManager } from '../drivers/appiumManager';
import { LoginPage } from '../pages/web/LoginPage';
import { DashboardPage } from '../pages/web/DashboardPage';

type UnifiedFixtures = {
  appiumManager: AppiumManager;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<UnifiedFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  appiumManager: async ({}, use) => {
    const manager = new AppiumManager();
    await manager.initialize();
    await use(manager);
    await manager.close();
  }
});
