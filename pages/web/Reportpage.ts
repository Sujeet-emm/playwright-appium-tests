import { Page, expect, Locator } from '@playwright/test';

export class ReportPage {

  readonly page: Page;
  readonly reportsMenu: Locator;
  readonly reportTypeDropdown: Locator;
  readonly deviceComplianceResult: Locator;
  readonly generateReportButton: Locator;
  readonly deviceIdField: Locator;
  readonly reportLoadingOverlay: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar — Reports accordion (li#reportsTab > a)
    this.reportsMenu = page.locator('li#reportsTab > a').first();

    // Report Type — Select2 dropdown trigger button
    this.reportTypeDropdown = page.locator('a.select2-choice').first();

    // Device Compliance option inside Select2 results list
    // (only visible after opening the dropdown)
    this.deviceComplianceResult = page.locator(
      '.select2-results li',
      { hasText: /device compliance/i }
    ).first();

    // Search button — exact id from DevTools
    this.generateReportButton = page.locator('button#advancedSearchBtn');

    // Device ID — column header in the results table (visible after Search)
    this.deviceIdField = page.locator(
      'table thead th',
      { hasText: /^device id$/i }
    ).first();

    // Loading overlay — wait for it to disappear after Search
    this.reportLoadingOverlay = page.locator(
      'div.loading-div, div[class*="loading"]'
    ).first();
  }

  async navigateToOnDemandReport() {
    // Step 1: Click Reports accordion to expand submenu
    await expect(this.reportsMenu).toBeVisible({ timeout: 15000 });
    await this.reportsMenu.click();

    // Step 2: Click On Demand Report link inside the expanded submenu
    const onDemandLink = this.page.locator(
      'ul#report_section_components a',
      { hasText: /on demand report/i }
    ).first();
    await expect(onDemandLink).toBeVisible({ timeout: 10000 });
    await onDemandLink.click();

    await this.page.waitForLoadState('domcontentloaded');

    // Assert on Reports heading — more reliable than URL check
    await expect(
      this.page.locator('h2, h1', { hasText: /reports/i }).first()
    ).toBeVisible({ timeout: 15000 });
  }

  async selectDeviceComplianceReport() {
    // Open the Select2 Report Type dropdown
    await expect(this.reportTypeDropdown).toBeVisible({ timeout: 10000 });
    await this.reportTypeDropdown.click();

    // Wait for results list to appear and pick Device Compliance
    await expect(this.deviceComplianceResult).toBeVisible({ timeout: 10000 });
    await this.deviceComplianceResult.click();

    await this.page.waitForLoadState('domcontentloaded');
  }

  async generateReport() {
    // Click Search button
    await expect(this.generateReportButton).toBeVisible({ timeout: 10000 });
    await this.generateReportButton.click();

    // Wait for loading overlay to disappear (if present)
    await this.reportLoadingOverlay
      .waitFor({ state: 'hidden', timeout: 30000 })
      .catch(() => {}); // ignore if overlay never appeared

    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyDeviceIdFieldVisible() {
    // Verify Device ID column header is visible in the results table
    await expect(this.deviceIdField).toBeVisible({ timeout: 15000 });
  }
}