import { expect, Locator, Page } from '@playwright/test';

export class DevicePage {

  readonly page: Page;
  readonly devicesMenu: Locator;
  readonly deviceHeader: Locator;
  readonly columnsButton: Locator;
  readonly workspaceStatusOption: Locator;
  readonly workspaceStatusColumnHeader: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.devicesMenu = page
      .getByRole('link', { name: /Devices/i })
      .first();

    this.deviceHeader = page
      .getByRole('link', { name: /Devices/i })
      .first();

    this.columnsButton = page.getByRole('button', { name: 'Columns', exact: true });

    // Workspace Status button — identified by ColVis_title text
    this.workspaceStatusOption = page.locator(
      'button.ColVis_Button.TableTools_Button',
      { hasText: 'Workspace Status' }
    );

    this.workspaceStatusColumnHeader = page.locator(
  'table#dt-device-list thead th',
  { hasText: 'Workspace Status' }
);
this.searchInput = page.locator('input[type="search"], input#device-search, #dt-device-list_filter input');

  }

  async navigateToDevices() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.devicesMenu).toBeVisible({ timeout: 15000 });
    await this.devicesMenu.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/device/);
    await expect(this.deviceHeader).toBeVisible();
  }

  async addWorkspaceStatusColumn() {

  // Open Columns dropdown
  await expect(this.columnsButton).toBeVisible({ timeout: 10000 });
  await this.columnsButton.click();

  // Wait for ColVis dropdown
  await expect(
    this.page.locator('div.ColVis_collection')
  ).toBeVisible({ timeout: 10000 });

  await expect(this.workspaceStatusOption).toBeVisible({ timeout: 10000 });

  // Check if Workspace Status is currently selected
  const isChecked = await this.workspaceStatusOption
    .locator('span.ColVis_radio')
    .evaluate((el) => {
      const style = window.getComputedStyle(el);
      return el.textContent?.trim() !== '' ||
             style.backgroundImage !== 'none' ||
             style.backgroundColor !== 'rgba(0, 0, 0, 0)';
    });

  if (isChecked) {
    console.log('Workspace Status is checked — unchecking first');
    await this.workspaceStatusOption.click();
    await this.page.waitForTimeout(500);
    console.log('Rechecking Workspace Status');
    await this.workspaceStatusOption.click();
  } else {
    console.log('Workspace Status is not checked — selecting it');
    await this.workspaceStatusOption.click();
  }

  // Click the ColVis background overlay to close dropdown
  // This is what ColVis uses to close when clicking outside
  await this.page.locator(
    'div.ColVis_collectionBackground.TableTools_collectionBackground'
  ).click({ force: true });

  // Wait for loading overlay to disappear
  await this.page.locator('div.loading-div')
    .waitFor({ state: 'hidden', timeout: 15000 })
    .catch(() => {}); // ignore if already gone

  await this.page.waitForLoadState('networkidle');
}

  async verifyWorkspaceStatusColumnVisible() {
    await expect(this.workspaceStatusColumnHeader).toBeVisible({ timeout: 10000 });
  }
  async searchDevice(searchText: string) {
  await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  await this.searchInput.clear();
  await this.searchInput.fill(searchText);
  await this.page.waitForLoadState('networkidle');
}
}