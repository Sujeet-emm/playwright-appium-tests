// TC_08_VerifyFailedLogin.spec.ts
import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { LoginPage } from '../../../pages/web/LoginPage';

test('verify error message on failed login with invalid credentials', async ({ page }) => {

  const loginFlow = new LoginFlow(page);
  const loginPage = new LoginPage(page);

  // Scenario 1: Invalid email format — error on step 1
  await loginFlow.loginWithInvalidCredentials(
    'invalid@example.com',
    'WrongPassword123'
  );

  // Verify still on login page
  await expect(page).toHaveURL(/login/i, { timeout: 10000 });

  // Verify error message visible
  await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });

  // Verify exact error text shown in snapshot
  await expect(loginPage.errorMessage).toContainText(/invalid user email/i);

  console.log('Error message:', await loginPage.errorMessage.textContent());
});