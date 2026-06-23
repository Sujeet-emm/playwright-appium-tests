import { test } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { DeviceFlow } from '../../../flows/DeviceFlow';
import { users } from '../../../testdatafile/Credentials';

test('verify dashboard to device module navigation', async ({ page, context }) => {

  // Step 1: Login
  const loginFlow = new LoginFlow(page);
  await loginFlow.login(users.admin.username, users.admin.password);

  // Step 2: Verify device navigation
  const deviceFlow = new DeviceFlow(page);
  await deviceFlow.verifyDeviceNavigation(context);
});