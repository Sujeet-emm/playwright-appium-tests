import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DashboardPage } from '../../../pages/web/DashboardPage';
import { DevicePage } from '../../../pages/web/DevicePage';
import { users } from '../../../testdatafile/Credentials';

test('verify device search by user name prashant', async ({ page, context }) => {

  // Step 1: Login to CSM
  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  // Step 2: Open EMM — returns new tab
  const dashboardPage = new DashboardPage(page);
  const emmPage = await dashboardPage.openEMM(context);

  // Step 3: Navigate to Devices
  const devicePage = new DevicePage(emmPage);
  await devicePage.navigateToDevices();

  // Step 4: Search for 'prashant'
  await devicePage.searchDevice('prashant');

  // Step 5: Verify search results contain 'prashant'
  await expect(
    emmPage.locator('table#dt-device-list tbody tr')
  ).not.toHaveCount(0); // at least one result

  await expect(
    emmPage.locator('table#dt-device-list tbody')
  ).toContainText(/prashant/i);
});