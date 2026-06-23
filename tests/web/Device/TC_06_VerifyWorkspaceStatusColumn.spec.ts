import { test } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DeviceFlow } from '../../../flows/DeviceFlow';
import { users } from '../../../testdatafile/Credentials';

test('verify workspace status column added from columns dropdown', async ({ page, context }) => {

  // Step 1: Login
  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  // Step 2: Verify workspace status column
  const deviceFlow = new DeviceFlow(page);
  await deviceFlow.verifyWorkspaceStatusColumn(context);
});