const {test,expect} = require("@playwright/test");
const {LoginPage} = require("../pages/loginPage");

test('verify page not found', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');

    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user','secret_sauce');

    await page.goto('https://www.saucedemo.com/testdemo.html');

    await expect(page.locator("//*[text()='Page not found']")).toBeVisible();

})