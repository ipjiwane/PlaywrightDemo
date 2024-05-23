const {test, expect} = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homepage');


test('Verify invalid login message', async({page}) => {

    //login button
    await page.locator('[data-test="login-button"]').click();

    //error message
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required');

})


test('Verify valid login', async({page}) => {

    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    //error message
    // await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required');

})

test.only('Verify logout', async({page}) => {

    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    const homepage = new HomePage(page);
    await homepage.logout();
    //error message
    // await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required');

})

