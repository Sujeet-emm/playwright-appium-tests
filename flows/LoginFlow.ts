import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/web/LoginPage';

export class LoginFlow {

  readonly loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async login(username: string, password: string) {

    await this.loginPage.goto();

    await this.loginPage.emailField.fill(username);

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.loginPage.signInButton.click()
    ]);

    await expect(this.loginPage.passwordField).toBeVisible({ timeout: 15000 });

    const currentEmail = await this.loginPage.emailField.inputValue();
    if (!currentEmail) {
      await this.loginPage.emailField.fill(username);
    }

    await this.loginPage.passwordField.fill(password);

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.loginPage.signInButton.click()
    ]);
  }

  async loginWithInvalidCredentials(username: string, password: string) {

    await this.loginPage.goto();

    await this.loginPage.emailField.fill(username);

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.loginPage.signInButton.click()
    ]);

    const passwordVisible = await this.loginPage.passwordField
      .isVisible()
      .catch(() => false);

    if (passwordVisible) {
      const currentEmail = await this.loginPage.emailField.inputValue();
      if (!currentEmail) {
        await this.loginPage.emailField.fill(username);
      }
      await this.loginPage.passwordField.fill(password);
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.loginPage.signInButton.click()
      ]);
    }
  }                                          // ← closing brace was missing here

  async forgotPassword(email: string, password: string, recoveryEmail: string) {

  await this.loginPage.goto();

  // Step 1: Enter email
  await this.loginPage.emailField.fill(email);
  await Promise.all([
    this.page.waitForLoadState('networkidle'),
    this.loginPage.signInButton.click()
  ]);

  // Step 2: Enter password
  await expect(this.loginPage.passwordField).toBeVisible({ timeout: 15000 });
  await this.loginPage.passwordField.fill(password);

  // Step 3: Click Forgot Password link
  await expect(this.loginPage.forgotPasswordLink).toBeVisible({ timeout: 10000 });

  // Wait for navigation to forgot password page
  await Promise.all([
    this.page.waitForURL(/password\/forgot/i, { timeout: 15000 }),
    this.loginPage.forgotPasswordLink.click()
  ]);

  // Step 4: Wait for recovery email input using exact id
  await expect(this.loginPage.recoveryEmailField).toBeVisible({ timeout: 10000 });

  // Step 5: Fill recovery email
  await this.loginPage.recoveryEmailField.fill(recoveryEmail);
}
  }
