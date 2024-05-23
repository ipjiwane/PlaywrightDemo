import {test,expect} from "@playwright/test"
import LoginPage from "../pages/loginPage"

// bug 27 - verify the presence of quantity fields
test('verify the presence of quantity field', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    const items = await page.locator("//div[@data-test='inventory-item']").all();
    for (let item of items){
        await item.locator("//div[@data-test='inventory-item-name']").click();
        await expect(page.locator("//div[@data-test='inventory-item']//button[text()='Add to cart']")).toHaveCount(1)
        await page.waitForTimeout(2000)
        await page.locator('#back-to-products').click();
    }
})


test.only('Verify that cart button is aligned correctly', async({page}) => {

    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('visual_user','secret_sauce');

    const item = page.locator("//div[@data-test='inventory-item']").first();
    await item.click();

    const btnRemove =  page.$$('#remove')
    if ((await btnRemove).length){
        await btnRemove.click();
    }
    await expect(page.locator('.primary_header')).toHaveScreenshot('project_details_cart.png')
})