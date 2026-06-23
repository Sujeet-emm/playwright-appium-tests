import { test } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DashboardPage } from '../../../pages/web/DashboardPage';
import { GroupPage } from '../../../pages/web/GroupPages';
import { users } from '../../../testdatafile/Credentials';

test('verify group creation and deletion', async ({ page, context }) => {

  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  const dashboardPage = new DashboardPage(page);
  const emmPage = await dashboardPage.openEMM(context);

  console.log('EMM Page URL:', emmPage.url()); // ← ADD THIS DEBUG LINE

  const groupPage = new GroupPage(emmPage);  // must be emmPage

  const groupName = `TestGroup_${Date.now()}`;

  await groupPage.navigateToGroups();
  await groupPage.createGroup(groupName);
  await groupPage.verifyGroupCreated(groupName);
  await groupPage.deleteGroup(groupName);
  await groupPage.verifyGroupDeleted(groupName);
});