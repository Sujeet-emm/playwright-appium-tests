import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DashboardPage } from '../../../pages/web/DashboardPage';
import { ReportPage } from '../../../pages/web/Reportpage';
import { users } from '../../../testdatafile/Credentials';

test('TC_11_VerifyDeviceComplianceReport — navigate to On Demand Report, generate Device Compliance report and verify Device ID field', async ({ page, context }) => {

  // Step 1: Login to CSM
  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  // Step 2: Open EMM — returns new tab
  const dashboardPage = new DashboardPage(page);
  const emmPage = await dashboardPage.openEMM(context);

  const reportPage = new ReportPage(emmPage);

  // Step 3: Navigate to Reports → On Demand Report
  await reportPage.navigateToOnDemandReport();

  // Step 4: Select Device Compliance report
  await reportPage.selectDeviceComplianceReport();

  // Step 5: Verify Device ID field is present on the page
  await reportPage.verifyDeviceIdFieldVisible();

  // Step 6: Generate the report
  await reportPage.generateReport();

  // Step 7: Verify we remain on the report page after generation
  await expect(emmPage).toHaveURL(/report/i, { timeout: 15000 });
});