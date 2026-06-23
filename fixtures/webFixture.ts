import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/web/LoginPage';
import { DashboardPage } from '../pages/web/DashboardPage';
import { DevicePage } from '../pages/web/DevicePage';
import { UserPage } from '../pages/web/UserPage';
import { EMMPage } from '../pages/web/EMMPage';

type WebFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  devicePage: DevicePage;
  userPage: UserPage;
  emmPage: EMMPage;
};

export const test = base.extend<WebFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  devicePage: async ({ page }, use) => use(new DevicePage(page)),
  userPage: async ({ page }, use) => use(new UserPage(page)),
  emmPage: async ({ page }, use) => use(new EMMPage(page)),
});

export { expect } from '@playwright/test';
