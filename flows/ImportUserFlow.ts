import { Page } from '@playwright/test';
import { DashboardPage } from '../pages/web/DashboardPage';
import { ImportUserPage } from '../pages/web/ImportUserPage';

export class ImportUserFlow {

  constructor(private page: Page) {}

  async validateImportUser() {

    const dashboard = new DashboardPage(this.page);

    // Open EMM popup
    const popup = await dashboard.openEMM();

    // Work inside popup
    const user = new ImportUserPage(popup);

    await user.importUsers();
  }
}
