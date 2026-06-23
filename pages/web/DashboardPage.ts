import { Page, expect, Locator, BrowserContext } from '@playwright/test';
import { Config } from '../../config/config';

export class DashboardPage {

  readonly page: Page;
  readonly emmMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emmMenu = page.getByText(
      'Enterprise Mobility Management',
      { exact: true }
    );
  }

  async openEMM(context: BrowserContext): Promise<Page> {

    // Wait until redirected from login
    await this.page.waitForURL(/.*\/web\/?/, { timeout: 60000 });

    // Use domcontentloaded — page has persistent connections (polling/WS)
    await this.page.waitForLoadState('domcontentloaded');

    // Wait for EMM menu to appear
    await expect(this.emmMenu).toBeVisible({ timeout: 60000 });

    // EMM opens in a new tab — capture it
    const [emmPage] = await Promise.all([
      context.waitForEvent('page'),
      this.emmMenu.click()
    ]);

    // Wait for DOM ready, then assert on a visible element instead of URL
    await emmPage.waitForLoadState('domcontentloaded');
    await expect(emmPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 60000 });

    return emmPage;
  }
}