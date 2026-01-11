import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SupportChatPage } from '../pages/supportChat.page';

test.describe('Support Chat', () => {
  let loginPage: LoginPage;
  let supportChatPage: SupportChatPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    supportChatPage = new SupportChatPage(page);

    await loginPage.loginWithRecoveryCode(
      process.env.KANDJI_EMAIL!,
      process.env.KANDJI_PASSWORD!,
      process.env.RECOVERY_CODE!
    );
    
  });

  test('should open @support chat', async ({ page }) => {
    await supportChatPage.openChat();
    await supportChatPage.sendMessage('how to add device');
    await expect(supportChatPage.searchResponse).toHaveText('Got it! Searching now...');
    // or
    await supportChatPage.acknowledgeSearch();
    await supportChatPage.closeChat();
  });
});