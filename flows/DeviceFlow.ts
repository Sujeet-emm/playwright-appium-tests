import { Page, BrowserContext } from '@playwright/test';
import { DashboardPage } from '../pages/web/DashboardPage';
import { DevicePage } from '../pages/web/DevicePage';

export class DeviceFlow {

  constructor(private page: Page) {}

  async verifyDeviceNavigation(context: BrowserContext) {

    const dashboard = new DashboardPage(this.page);

    // Open EMM — returns new tab
    const emmPage = await dashboard.openEMM(context);

    // Device actions on EMM page
    const devicePage = new DevicePage(emmPage);
    await devicePage.navigateToDevices();
  }

  async verifyWorkspaceStatusColumn(context: BrowserContext) {

    const dashboard = new DashboardPage(this.page);

    // Open EMM — returns new tab
    const emmPage = await dashboard.openEMM(context);

    // Device actions on EMM page
    const devicePage = new DevicePage(emmPage);
    await devicePage.navigateToDevices();
    await devicePage.addWorkspaceStatusColumn();
    await devicePage.verifyWorkspaceStatusColumnVisible();
  }
}