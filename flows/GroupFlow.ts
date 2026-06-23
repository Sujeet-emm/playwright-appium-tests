import { Page, BrowserContext } from '@playwright/test';
import { DashboardPage } from '../pages/web/DashboardPage';
import { GroupPage } from '../pages/web/GroupPages';

export class GroupFlow {

  constructor(private page: Page) {}

  async createAndDeleteGroup(context: BrowserContext, groupName: string) {

    const dashboard = new DashboardPage(this.page);

    // Open EMM — returns new tab
    const emmPage = await dashboard.openEMM(context);

    const groupPage = new GroupPage(emmPage);

    // Step 1: Navigate to Groups
    await groupPage.navigateToGroups();

    // Step 2: Create group
    await groupPage.createGroup(groupName);

    // Step 3: Verify group created
    await groupPage.verifyGroupCreated(groupName);

    // Step 4: Delete group
    await groupPage.deleteGroup(groupName);

    // Step 5: Verify group deleted
    await groupPage.verifyGroupDeleted(groupName);
  }
}