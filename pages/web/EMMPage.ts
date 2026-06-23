import { Page, expect, Locator } from '@playwright/test';

export class EMMPage {

  readonly page: Page;
  readonly overviewTab: Locator;
  readonly deviceStatisticsTab: Locator;
  readonly dataUsageTab: Locator;
  readonly workspaceTab: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators based on actual HTML: <a data-toggle="tab"> inside <li>
    this.overviewTab = page.locator('a.btn[href="#overviewTabContent"]');
    this.deviceStatisticsTab = page.locator('li#infectionStatusTabTabLi a');
    this.dataUsageTab = page.locator('li#nwStatusTab a');

    // Inspect DevTools to confirm workspace tab ID and update below
    this.workspaceTab =  page.locator('a.btn[href="#secureWorkspaceTabContent"]');
  }

  async validateDashboardTabs() {
    await expect(this.overviewTab).toBeVisible({ timeout: 15000 });
    await expect(this.deviceStatisticsTab).toBeVisible({ timeout: 15000 });
    await expect(this.dataUsageTab).toBeVisible({ timeout: 15000 });
    await expect(this.workspaceTab).toBeVisible({ timeout: 15000 });
  }
}