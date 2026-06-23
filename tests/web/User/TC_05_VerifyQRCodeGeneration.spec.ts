import { test } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DashboardPage } from '../../../pages/web/DashboardPage';
import { UserPage } from '../../../pages/web/UserPage';
import { users } from '../../../testdatafile/Credentials';

test('verify QR code generation from user module', async ({ page, context }) => {

  // Step 1: Login to CSM
  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  // Step 2: Open EMM — returns new tab
  const dashboardPage = new DashboardPage(page);
  const emmPage = await dashboardPage.openEMM(context);

  // Step 3: Use EMM page for UserPage — navigate to Users + generate QR
  const userPage = new UserPage(emmPage);
  await userPage.generateQRCode();
});