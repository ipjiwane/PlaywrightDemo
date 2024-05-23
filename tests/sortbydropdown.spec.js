import {test, expect} from '@playwright/test';
import LoginPage from '../pages/loginPage';

// bug 19
test('verify Sort By dropdown label', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    expect(page.locator("//select[@class='product_sort_container']/preceding-sibling::*[text()='Sort By']")).toHaveCount(1);
})



// bug 20
test('Verify Filter options category and price', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    expect.soft(page.locator("//*[text()='Category']")).toHaveCount(1);   
    
    expect.soft(page.locator("//*[text()='Price']")).toHaveCount(1); 
})

// bug 22
// cannot be verified by playwright as the mouse click cannot be performed on pseudo elements
// is there a way to fix this issue

test.only('example test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('standard_user','secret_sauce');

    await expect(page).toHaveScreenshot();
  });


