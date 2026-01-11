import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { setNewRecoveryCode } from '../utils/envUtils';

test('should login with @recovery code', async ({ page }) => {

  const loginPage = new LoginPage(page);
  loginPage.login( process.env.KANDJI_EMAIL, process.env.KANDJI_PASSWORD);

  await loginPage.tryAnotherMethodButton.click();
  await loginPage.recoveryCodeOption.click();
  await expect(loginPage.verifyYourIdentityHeading).toBeVisible();

  await loginPage.recoveryCodeField.fill(process.env.RECOVERY_CODE || '');
  await loginPage.continueButton.click();

  const code = await loginPage.getRecoveryCode();
  await setNewRecoveryCode(code);

  console.log("Created Code: " + code);

  await loginPage.safelyRecordedCheckbox.click();
  await loginPage.continueButton.click();

  await expect(page.getByRole('heading', { name: 'Devices', exact: true })).toBeVisible();

});