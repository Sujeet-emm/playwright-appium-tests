import { Page } from '@playwright/test';
import { UserPage } from '../pages/web/UserPage';

export class UserFlow {

  private userPage: UserPage;

  constructor(page: Page) {
    this.userPage = new UserPage(page);
  }

  async verifyQRCodeGeneration() {
    await this.userPage.generateQRCode();
  }
}