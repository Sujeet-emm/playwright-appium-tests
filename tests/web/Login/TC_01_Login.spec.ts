// tests/web/login/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow.js';
import { users } from '../../../testdatafile/Credentials.js';

test('login test', async ({ page }) => {
  const loginFlow = new LoginFlow(page);

  await loginFlow.login(
    users.admin.username,
    users.admin.password
  );
  await expect(page).not.toHaveURL("https://account.seqrite.com/cas/login");
});
