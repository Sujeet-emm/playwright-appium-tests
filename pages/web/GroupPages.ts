import { Page, expect, Locator } from '@playwright/test';

export class GroupPage {

  page: Page;
  readonly groupsMenu: Locator;
  readonly addGroupButton: Locator;
  readonly groupNameField: Locator;
  readonly saveButton: Locator;
  readonly groupRow: (groupName: string) => Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar Groups link
    this.groupsMenu = page.locator('a', { hasText: 'Groups' }).first();

    // Add/Create Group button
    //this.addGroupButton = page.locator('button', { hasText: /add group|create group|new group/i });
    //this.addGroupButton = page.locator('button', { hasText: /add group|create group|new group/i });
    
    this.addGroupButton = page.locator('a.btn.btn-default.btn-icon.glyphicons.circle_plus');
    // Group name input field in modal/form
    //this.groupNameField = page.locator('input[name*="group" i], input#groupName, input[placeholder*="group name" i]').first();
    this.groupNameField = page.locator('input#devicegroup_name_create');
    // Save/Submit button in modal
    //this.saveButton = page.locator('button[type="submit"], button', { hasText: /save|submit|create/i }).first();
// More specific — avoid matching unrelated buttons
   this.saveButton = page.locator('button#devicegroupDtls_createDevicegroupInfoBtn');
    // Dynamic row locator — finds a row by group name
    this.groupRow = (groupName: string) =>
      page.locator('table tbody tr', { hasText: groupName });

    // Delete icon/button (usually pencil/trash icon in action column)
    this.deleteButton = page.locator('a[title*="delete" i], button[title*="delete" i], i[class*="delete" i]').first();

    // Confirmation dialog "Yes/Delete/Confirm" button
    this.confirmDeleteButton = page.locator('button', { hasText: /yes|delete|confirm|ok/i }).first();

    // Success toast/message
    this.successMessage = page.locator('div[class*="success" i], div[class*="alert" i], div[class*="toast" i]').first();
  }

  async navigateToGroups() {
    await this.groupsMenu.click();
    await this.page.waitForURL(/group/i, { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }
async createGroup(groupName: string) {
  await expect(this.addGroupButton).toBeVisible({ timeout: 10000 });
  await this.addGroupButton.click();

  const addGroupOption = this.page.locator('a[href="/deviceGroups/details"]');
  await expect(addGroupOption).toBeVisible({ timeout: 10000 });

  let groupFormPage = this.page;
  try {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 5000 }),
      addGroupOption.click()
    ]);
    groupFormPage = newPage;
    await groupFormPage.waitForLoadState('networkidle');
  } catch {
    await this.page.waitForURL(/deviceGroups\/details/i, { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  const groupNameField = groupFormPage.locator('input#devicegroup_name_create');
  const saveButton = groupFormPage.locator('button#devicegroupDtls_createDevicegroupInfoBtn');

  await expect(groupNameField).toBeVisible({ timeout: 10000 });
  await groupNameField.fill(groupName);

  await this.selectFirstOptionFromModal(
    groupFormPage,
    'button#deviceGrpDetails-selectPolicyModal-link-create',
    'div#change_policy_modal',
    'tr#policy-row-1'
  );

  await this.selectFirstOptionFromModal(
    groupFormPage,
    'button#deviceGrpDetails-selectAppConfigModal-link-create',
    'div#change_appconfig_modal',
    'tr#appConfig-row-1'
  );

  await this.selectFirstOptionFromModal(
    groupFormPage,
    'button#deviceGrpDetails-selectWorkspacePolicyModel-link-create',
    'div#change_workspace_policy_modal',
    'tr#Policy-row-1'
  );

  await this.selectFirstOptionFromModal(
    groupFormPage,
    'button#deviceGrpDetails-selectswProfileModal-link-create',
    'div#select_swProfile_modal',
    'tr#profile-row-1'
  );

  await this.selectFirstOptionFromModal(
    groupFormPage,
    'button#deviceGrpDetails-selectDeviceProfileModal-link-create',
    'div#select_device_profile_modal',
    'tr#device-profile-row-1'
  );

  // Step 7: Click Save
  await expect(saveButton).toBeVisible({ timeout: 10000 });
  await saveButton.click();

  // Step 8: Handle success popup — click OK/Confirm button
  const successPopup = groupFormPage.locator('div.modal.fade.in, div.modal.show').filter({
    hasText: /success|created|group added/i
  });

  try {
    await expect(successPopup).toBeVisible({ timeout: 10000 });

    const okButton = successPopup.locator('button', { hasText: /ok|close|confirm/i });
    await okButton.click();

    await expect(successPopup).not.toBeVisible({ timeout: 10000 });
  } catch {
    console.log('No success popup appeared — continuing');
  }

  await groupFormPage.waitForLoadState('networkidle');

  if (groupFormPage !== this.page) {
    this.page = groupFormPage;
  }

  // Step 9: Navigate back to Groups list
  await this.navigateToGroups();
}

// Reusable helper for any "select from modal" field
private async selectFirstOptionFromModal(
  page: Page,
  triggerSelector: string,
  modalSelector: string,
  firstRowSelector: string
) {
  const trigger = page.locator(triggerSelector);

  const exists = await trigger.count();
  if (exists === 0) {
    console.log(`Skipping ${triggerSelector} — not found on page`);
    return;
  }

  await expect(trigger).toBeVisible({ timeout: 10000 });
  await trigger.click();

  const modal = page.locator(modalSelector);
  await expect(modal).toBeVisible({ timeout: 10000 });

  const firstRow = page.locator(firstRowSelector);
  await expect(firstRow).toBeVisible({ timeout: 10000 });
  await firstRow.click();

  await expect(modal).not.toBeVisible({ timeout: 10000 });
}
  async verifyGroupCreated(groupName: string) {
    await expect(this.groupRow(groupName)).toBeVisible({ timeout: 10000 });
  }

  async deleteGroup(groupName: string) {
  await this.navigateToGroups();

  const row = this.groupRow(groupName);
  await expect(row).toBeVisible({ timeout: 10000 });

  // Click the trash/delete icon — class is "fa fa-trash-o" with parent "deviceGroupDeleteBtn"
  await row.locator('a.deviceGroupDeleteBtn, i.fa-trash-o').first().click();

  // Confirm deletion in popup
  await expect(this.confirmDeleteButton).toBeVisible({ timeout: 10000 });
  await this.confirmDeleteButton.click();

  await this.page.waitForLoadState('networkidle');
}
  async verifyGroupDeleted(groupName: string) {
    await expect(this.groupRow(groupName)).not.toBeVisible({ timeout: 10000 });
  }
}