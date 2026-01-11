import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DevicePage } from '../pages/device.page';

test.describe('Device Management', () => {
  let loginPage: LoginPage;
  let devicePage: DevicePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    devicePage = new DevicePage(page);

    await loginPage.loginWithRecoveryCode(
      process.env.KANDJI_EMAIL!,
      process.env.KANDJI_PASSWORD!,
      process.env.RECOVERY_CODE!
    );
    
  });

  test('should able to open @add-device page', async ({ page }) => {
    await devicePage.clickAddDevicesButton();
    await devicePage.verifyEnrollmentPageHeader();
    await devicePage.clickManualEnrollmentTab();
    await devicePage.verifyConfigureApnsButtonExists();
  });
});
