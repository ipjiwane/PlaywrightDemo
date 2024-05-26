const { expect } = require("@playwright/test");
const user_details = JSON.parse(JSON.stringify(require("../checkoutfieldvalues.json")))

exports.CheckoutPage = class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.first_name_txt = page.locator("#first-name");
        this.last_name_txt = page.locator("#last-name");
        this.postal_code_txt = page.locator("#postal-code");
        this.continue_btn = page.locator("#continue");
    }

    async validateUserInformationInputFields() {

        //enter invalid values
        await this.first_name_txt.fill('123565^&^&^&^&345');
        await this.last_name_txt.fill('123565^&^&^&^&345');
        await this.postal_code_txt.fill('^&^&^&^&3()&*%^#$!@');
        await this.continue_btn.click();

        await expect.soft(this.page.locator("//*[text()='Error: First Name is invalid']")).toBeVisible();
        await expect.soft(this.page.locator("//*[text()='Error: Last Name is invalid']")).toBeVisible();
        await expect.soft(this.page.locator("//*[text()='Error: Postal Code is invalid']")).toBeVisible();
    }


    async validateEmptyFieldError() {

        await this.first_name_txt.fill('');
        await this.last_name_txt.fill('test_last_name');
        await this.postal_code_txt.fill('3602AJ');
        await this.continue_btn.click();

        const error_ele = await page.locator("//input[@placeholder='First Name']/following-sibling::*[contains(@class,'error_icon')]");
        await expect.soft(error_ele).toBeVisible();
        const error_elements = await page.locator("//div[@class='form_group']//*[contains(@class,'error_icon')]");
        await expect.soft(error_elements).toHaveCount(1);

    }

    async verifyLastNameFieldisEditable() {
        await this.last_name_txt.fill("test_last_name");
        await expect(this.last_name_txt).toHaveValue("test_last_name");
    }

    async verifyUserInformationFieldsMandatory() {

        for (let data of user_details) {
            await this.page.goto("https://www.saucedemo.com/checkout-step-one.html");
            let field_name;
            if (data.first_name === '') {
                field_name = 'First Name';
            } else if (data.last_name === '') {
                field_name = 'Last Name'
            } else if (data.postal_code === '') {
                field_name = 'Postal Code'
            }

            await this.first_name_txt.fill(data.first_name);
            await this.last_name_txt.fill(data.last_name);
            await this.postal_code_txt.fill(data.postal_code);

            await this.continue_btn.click();
            await expect.soft(this.page.locator("//*[text()='Error: " + field_name + " is required']")).toBeVisible();
        }
    }
}