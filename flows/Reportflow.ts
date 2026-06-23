import { Page, BrowserContext } from '@playwright/test';
import { DashboardPage } from '../pages/web/DashboardPage';
import { ReportPage } from '../pages/web/Reportpage';

export class ReportFlow {

  constructor(private page: Page) {}

  async generateDeviceComplianceReport(context: BrowserContext) {

    const dashboard = new DashboardPage(this.page);

    // Open EMM — returns new tab
    const emmPage = await dashboard.openEMM(context);

    const reportPage = new ReportPage(emmPage);

    // Step 1: Navigate to Reports → On Demand Report
    await reportPage.navigateToOnDemandReport();

    // Step 2: Select Device Compliance report type
    await reportPage.selectDeviceComplianceReport();

    // Step 3: Generate the report
    await reportPage.generateReport();

    return reportPage;
  }
}