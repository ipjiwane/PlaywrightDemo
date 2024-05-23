import {test, expect} from "@playwright/test";

import LoginPage from "../pages/loginPage";


//alerts - only OK button
test('verify alerts', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('I am an alert box!');
        await page.waitForTimeout(2000);
        await dialog.accept();
    })

    await page.locator("//button[normalize-space()='Alert']").click();  
})

//confirmation dialogs - OK and Cancel button


//prompt - input box with OK and Cancel button