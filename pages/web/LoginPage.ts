import { Page, Locator } from '@playwright/test';
import { Config } from '../../config/config';

export class LoginPage {

  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly enterpriseMobilityManagement: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly recoveryEmailField: Locator;
  readonly captchaCheckbox: Locator;
  readonly submitRecoveryButton: Locator;
  readonly recoverySuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailField = page.locator('#usernameTmp');
    this.passwordField = page.locator('#password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.enterpriseMobilityManagement = page.getByText(
      'Enterprise Mobility Management', { exact: true }
    );
    this.errorMessage = page.locator(
      'div[class*="error"], span[class*="error"]'
    ).first();

    this.forgotPasswordLink = page.locator('a', { hasText: /forgot password/i }).first();

    // First email input on recovery page
    // Recovery email — use the exact id
this.recoveryEmailField = page.locator('input#email');

// Submit button — already correct "Recover"
this.submitRecoveryButton = page.getByRole('button', { name: 'Recover' });

// Error message on recovery page
// Target the exact paragraph text on success page
this.recoverySuccessMessage = page.locator('p').filter({
  hasText: /instruction|password has been sent|registered email/i
});
    // reCAPTCHA checkbox inside iframe
    this.captchaCheckbox = page.frameLocator('iframe[src*="recaptcha"]')
      .locator('.recaptcha-checkbox-border');

    // Submit button on recovery page
    this.submitRecoveryButton = page.locator('button[type="submit"]').first();

    // Success message after submitting recovery
    this.recoverySuccessMessage = page.locator(
      'div[class*="success"], div[class*="alert"], p[class*="message"], div[class*="info"]'
    ).first();
  }

  async goto() {
    await this.page.goto(Config.baseUrl);
  }

  async enterUsername(username: string) {
    await this.emailField.fill(username);
    await this.signInButton.click();
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
  }

  async clickEnterpriseMobilityManagement() {
    await this.enterpriseMobilityManagement.click();
  }
}