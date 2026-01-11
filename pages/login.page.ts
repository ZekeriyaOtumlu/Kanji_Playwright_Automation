import { Page, Locator, expect } from '@playwright/test';
import { setNewRecoveryCode } from '../utils/envUtils';

export class LoginPage {
    readonly page: Page;
    readonly emailAddressField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly tryAnotherMethodButton: Locator;
    readonly recoveryCodeOption: Locator;
    readonly verifyYourIdentityHeading: Locator;
    readonly recoveryCodeField: Locator;
    readonly multilineLocator: Locator;
    readonly safelyRecordedCheckbox: Locator;

    constructor(page: Page  ) {
        this.page = page;
        this.emailAddressField = page.getByRole('textbox', { name: 'Email address' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.tryAnotherMethodButton = page.getByRole('button', { name: 'Try another method' });
        this.recoveryCodeOption = page.getByRole('button', { name: 'Recovery code' });
        this.verifyYourIdentityHeading = page.getByRole('heading', { name: 'Verify Your Identity' });
        this.recoveryCodeField = page.getByRole('textbox', { name: 'Enter your recovery code' });
        this.multilineLocator = page.locator('.multiline');
        this.safelyRecordedCheckbox = page.locator('label');
    }

    async login(email: any, password: any): Promise<void> {
        await this.page.goto('/signin');
        await this.page.waitForLoadState('networkidle');
        await this.emailAddressField.fill(email);
        await this.passwordField.fill(password);
        await this.continueButton.click();
    }

    async getRecoveryCode(): Promise<string | null> {
        return await this.multilineLocator.textContent();
    }

    async loginWithRecoveryCode(email: string, password: string, recoveryCode: string): Promise<void> {
        // Perform initial login
        await this.login(email, password);

        // Handle MFA with recovery code
        await this.tryAnotherMethodButton.click();
        await this.recoveryCodeOption.click();
        await expect(this.verifyYourIdentityHeading).toBeVisible();

        await this.recoveryCodeField.fill(recoveryCode);
        await this.continueButton.click();

        // Get new recovery code and update environment
        const newCode = await this.getRecoveryCode();
        if (newCode) {
            await setNewRecoveryCode(newCode);
            console.log("Created Code: " + newCode);
        }

        // Complete the login process
        await this.safelyRecordedCheckbox.click();
        await this.continueButton.click();

        // Verify successful login
        await expect(this.page.getByRole('heading', { name: 'Devices', exact: true })).toBeVisible();
    }
}