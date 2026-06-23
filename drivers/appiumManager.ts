import { remote } from 'webdriverio';
import type { RemoteOptions } from 'webdriverio';
import { Config } from '../config/config';

type AppiumCapabilities = RemoteOptions['capabilities'];

export class AppiumManager {
  private driver: Awaited<ReturnType<typeof remote>> | null = null;

  async initialize(capabilities: AppiumCapabilities = Config.appium.defaultCapabilities) {
    this.driver = await remote({
      hostname: Config.appium.hostname,
      port: Config.appium.port,
      logLevel: 'warn',
      capabilities,
    });
    return this.driver;
  }

  async close(): Promise<void> {
    if (this.driver) {
      await this.driver.deleteSession();
      this.driver = null;
    }
  }

  getDriver() {
    if (!this.driver) throw new Error('AppiumManager: driver not initialized');
    return this.driver;
  }
}
