import { expect, Locator, Page } from '@playwright/test';

export class ImportUserPage {
  readonly page: Page;
  readonly emmLink: Locator;
  readonly usersMenu: Locator;
  readonly importFromCSMButton: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly importSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emmLink = page.locator('a').filter({ hasText: 'Enterprise Mobility Management' });
    this.usersMenu = page.getByRole('link', { name: 'Users' });
    this.importFromCSMButton = page.getByRole('button', { name: 'Import from CSM' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.importSuccessMessage = page.getByText('Importing of Users has been');
  }

  async openEMM() {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.emmLink.click(),
    ]);

    return popup;
  }

  async importUsers() {
    await this.usersMenu.click();
    await expect(this.page).toHaveURL(/user\/list/i);
    await expect(this.confirmButton).toBeVisible({ timeout: 10000 });
    await this.confirmButton.click();
    await expect(this.importSuccessMessage).toBeVisible();
  }
}
