import { test } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { ImportUserFlow } from '../../../flows/ImportUserFlow';
import { users } from '../../../testdatafile/Credentials';

test('import user test', async ({ page }) => {
  const loginFlow = new LoginFlow(page);
  const importUserFlow = new ImportUserFlow(page);

  await loginFlow.login(
    users.admin.username,
    users.admin.password
  );

  await importUserFlow.validateImportUser();
});