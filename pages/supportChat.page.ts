import { Page, Locator, expect, FrameLocator } from '@playwright/test';

export class SupportChatPage {
    readonly page: Page;
    readonly chatIframe: FrameLocator;
    readonly openChatButton: Locator;
    readonly messageEditor: Locator;
    readonly searchResponse: Locator;
    readonly closeWidgetButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chatIframe = page.locator('iframe[name="fc_widget"]').contentFrame();
        this.openChatButton = this.chatIframe.getByRole('button', { name: 'Open chat' });
        this.messageEditor = this.chatIframe.locator('[data-test-id="ui-editor"]');
        this.searchResponse = this.chatIframe.getByText('Got it! Searching now...');
        this.closeWidgetButton = this.chatIframe.getByRole('button', { name: 'Close widget' });
    }

    async openChat(): Promise<void> {
        await this.openChatButton.click();
    }

    async sendMessage(message: string): Promise<void> {
        await this.messageEditor.fill(message);
        await this.page.keyboard.press('Enter');
    }

    async acknowledgeSearch(): Promise<void> {
        await this.searchResponse.click();
    }

    async closeChat(): Promise<void> {
        await this.closeWidgetButton.click();
    }
}