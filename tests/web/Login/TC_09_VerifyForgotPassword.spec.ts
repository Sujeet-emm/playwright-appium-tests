import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../../flows/LoginFlow';
import { LoginPage } from '../../../pages/web/LoginPage';
import { users } from '../../../testdatafile/Credentials';

test('verify forgot password flow with recovery email and captcha validation', async ({ page }) => {

  const loginFlow = new LoginFlow(page);
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to forgot password page and fill recovery email
  await loginFlow.forgotPassword(
    users.admin.username,
    users.admin.password,
    users.admin.username
  );

  // Step 2: Verify URL is on forgot password page
  await expect(page).toHaveURL(/password\/forgot/i);

  // Step 3: Verify recovery email field has value
  await expect(loginPage.recoveryEmailField).toHaveValue(users.admin.username);

  // Step 4: Verify captcha is present
  await expect(
    page.frameLocator('iframe[src*="recaptcha"]')
      .locator('.recaptcha-checkbox-border')
  ).toBeVisible({ timeout: 10000 });

  // Step 5: Click captcha — manual solve required in headed mode
  await loginPage.captchaCheckbox.click();
  await page.waitForTimeout(3000);

  // Step 6: Click Recover button
  await expect(loginPage.submitRecoveryButton).toBeVisible({ timeout: 10000 });
  await loginPage.submitRecoveryButton.click();
  await page.waitForLoadState('networkidle');

  // Step 7: Verify success or error message appears
  // Step 7: Verify success message
await expect(loginPage.recoverySuccessMessage).toBeVisible({ timeout: 15000 });

await expect(loginPage.recoverySuccessMessage).toContainText(
  /instruction for resetting|password has been sent|registered email address/i
);

console.log('Recovery message:', await loginPage.recoverySuccessMessage.textContent());
});