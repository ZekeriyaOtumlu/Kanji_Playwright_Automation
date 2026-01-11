import { Page, Locator } from '@playwright/test';

export class SideBarMenuPage {
    readonly page: Page;
    readonly devicesSideBar: Locator;
    readonly devicesHeader: Locator;
    readonly bluePrintSideBar: Locator;
    readonly librarySideBar: Locator;
    readonly usersSideBar: Locator;
    readonly threatsSideBar: Locator;
    readonly vulnerabilitiesSideBar: Locator;
    readonly alertsSideBar: Locator;
    readonly activitySideBar: Locator;
    readonly enrollmentSideBar: Locator;
    readonly resourcesSideBar: Locator;

    constructor(page: Page) {
        this.page = page;

        this.devicesHeader = page.locator('xpath=//h2[text()="Devices"]');
        this.devicesSideBar = page.locator('xpath=//span[text()="Devices"]');
        this.bluePrintSideBar = page.locator('xpath=//span[text()="Blueprints"]');
        this.librarySideBar = page.locator('xpath=//span[text()="Library"]');
        this.usersSideBar = page.locator('xpath=//span[text()="Users"]');
        this.threatsSideBar = page.locator('xpath=//span[text()="Threats"]');
        this.vulnerabilitiesSideBar = page.locator('xpath=//span[text()="Vulnerabilities"]');
        this.alertsSideBar = page.locator('xpath=//span[text()="Alerts"]');
        this.activitySideBar = page.locator('xpath=//span[text()="Activity"]');
        this.enrollmentSideBar = page.locator('xpath=//span[text()="Enrollment"]');
        this.resourcesSideBar = page.locator('xpath=//span[text()="Resources"]');
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.goto('/');
        await this.devicesHeader.fill(username);
        
    }

    async logout(): Promise<void> {
        // await this.openMenuButton.click();
        // await this.logoutButton.click();
    }

}