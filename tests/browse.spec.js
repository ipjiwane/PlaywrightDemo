const {test, expect} = require("@playwright/test")

import LoginPage from "../pages/loginPage";

//bug 17 - verify the presence of quantity field
test.only('verify the presence of quantity field',async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    const items = await page.locator("//div[@data-test='inventory-item']").all();
    for (let item of items){
        await expect(item.locator("//*[text()='Quantity']")).toHaveCount(1)
    }
})
