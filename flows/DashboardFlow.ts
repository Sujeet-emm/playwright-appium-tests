import { Page } from '@playwright/test';
import { DashboardPage } from '../pages/web/DashboardPage';

export class DashboardFlow {

  readonly page: Page;
  readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
  }

  async openEMM() {
    await this.dashboardPage.openEMM();
  }
}