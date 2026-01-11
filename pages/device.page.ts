import { Page, Locator, expect } from '@playwright/test';

export class DevicePage {
    readonly page: Page;
    readonly addDevicesButton: Locator;
    readonly enrollmentHeading: Locator;
    readonly manualEnrollmentTab: Locator;
    readonly configureApnsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addDevicesButton = page.getByRole('button', { name: 'circle-plus Add devices' });
        this.enrollmentHeading = page.getByRole('heading', { name: 'Enrollment' });
        this.manualEnrollmentTab = page.getByRole('tab', { name: 'Manual Enrollment' });
        this.configureApnsButton = page.getByLabel('Manual Enrollment').getByRole('button', { name: 'Configure APNs' });
    }

    async clickAddDevicesButton(): Promise<void> {
        await this.addDevicesButton.click();
    }

    async verifyEnrollmentPageHeader(): Promise<void> {
        await expect(this.enrollmentHeading).toBeVisible();
    }

    async clickManualEnrollmentTab(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await this.manualEnrollmentTab.click();
    }

    async verifyConfigureApnsButtonExists(): Promise<void> {
        await this.page.waitForTimeout(5000);
        await expect(this.configureApnsButton).toBeEnabled();
    }
}
