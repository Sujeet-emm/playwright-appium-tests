import { test } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DashboardPage } from '../../../pages/web/DashboardPage';
import { EMMPage } from '../../../pages/web/EMMPage';
import { users } from '../../../testdatafile/Credentials';

test('dashboard module test', async ({ page, context }) => {

  // Step 1: Login
  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  // Step 2: Open EMM — returns the new tab's page
  const dashboardPage = new DashboardPage(page);
  const emmPageHandle = await dashboardPage.openEMM(context);

  // Step 3: Validate EMM tabs using the new tab's page
  const emmPage = new EMMPage(emmPageHandle);
  await emmPage.validateDashboardTabs();
});