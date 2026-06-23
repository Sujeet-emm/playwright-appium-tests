import { Page, expect, Locator } from '@playwright/test';

export class UserPage {

  readonly page: Page;
  readonly firstUserCheckbox: Locator;
  readonly takeActionBar: Locator;
  readonly takeActionDropdownBtn: Locator;
  readonly enrollmentPreferenceBtn: Locator;
  readonly enrollmentTypeBtn: Locator;
  readonly submitButton: Locator;
  readonly usersMenu: Locator;          // ← ADD THIS

  constructor(page: Page) {
  this.page = page;

  this.usersMenu = page.locator('a', { hasText: 'Users' }).first();
  this.firstUserCheckbox = page.locator('table tbody tr:first-child input[type="checkbox"]');
  this.takeActionBar = page.locator('div#actionBox');
  this.takeActionDropdownBtn = page.locator('button[data-id="users-action-drop-down"]');
  this.enrollmentPreferenceBtn = page.locator('button[data-id="selectEnrollment-preference-drop-down"]');
  this.enrollmentTypeBtn = page.locator('button[data-id="selectEnrollment-drop-down"]');

  // Use specific ID to avoid matching the feedback modal Submit button
  this.submitButton = page.locator('button#user-actions-submit-btn');
}
  // ← ADD THIS METHOD
  async navigateToUsers() {
    await this.usersMenu.click();
    await this.page.waitForURL(/user\/list/i, { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async generateQRCode() {

  await this.navigateToUsers();

  // Step 2: Check first user checkbox
  await expect(this.firstUserCheckbox).toBeVisible({ timeout: 10000 });
  await this.firstUserCheckbox.check();

  // Step 3: Wait for Take Action bar
  await expect(this.takeActionBar).toBeVisible({ timeout: 10000 });

  // Step 4: Dropdown 1 — Enrollment Request
  await this.takeActionDropdownBtn.click();
  // Wait for THIS dropdown's menu to open
  await expect(this.page.locator('button[data-id="users-action-drop-down"]')
    .locator('xpath=following-sibling::div')
    .locator('ul.dropdown-menu.inner')).toBeVisible({ timeout: 5000 });
  await this.page
    .locator('ul.dropdown-menu.inner li a')
    .filter({ hasText: 'Enrollment Request' })
    .first()
    .dispatchEvent('click');

  // Step 5: Dropdown 2 — For Android Devices
  await expect(this.enrollmentPreferenceBtn).toBeVisible({ timeout: 10000 });
  await this.enrollmentPreferenceBtn.click();
  await expect(this.page.locator('button[data-id="selectEnrollment-preference-drop-down"]')
    .locator('xpath=following-sibling::div')
    .locator('ul.dropdown-menu.inner')).toBeVisible({ timeout: 5000 });
  await this.page
    .locator('ul.dropdown-menu.inner li a')
    .filter({ hasText: 'Android Enterprise Enrollment' })
    .first()
    .dispatchEvent('click');

  // Step 6: Dropdown 3 — QR Code, Email or SMS
  await expect(this.enrollmentTypeBtn).toBeVisible({ timeout: 10000 });
  await this.enrollmentTypeBtn.click();
  await expect(this.page.locator('button[data-id="selectEnrollment-drop-down"]')
    .locator('xpath=following-sibling::div')
    .locator('ul.dropdown-menu.inner')).toBeVisible({ timeout: 5000 });
  await this.page
    .locator('ul.dropdown-menu.inner li a')
    .filter({ hasText: 'QR Code, Email or SMS' })
    .first()
    .dispatchEvent('click');

  // Step 7: Wait for Submit button and click
  // Button exists but may be hidden during loading — wait for loading to finish
  await this.page.waitForSelector('generic:has-text("Loading")', { state: 'hidden', timeout: 15000 })
    .catch(() => {}); // ignore if loading overlay not present

  await expect(this.submitButton).toBeVisible({ timeout: 15000 });
  await this.submitButton.click();

  await this.page.waitForLoadState('networkidle');
}}