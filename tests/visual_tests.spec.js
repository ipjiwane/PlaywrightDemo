const {test, expect} = require('@playwright/test');
import LoginPage from '../pages/loginPage';

//bug 23 - incorrect location of cart for visual user
test('verify cart location', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('visual_user','secret_sauce');

    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#reset_sidebar_link').click()
    await page.locator('#react-burger-cross-btn').click()
    
    await page.waitForTimeout(5000);

    await expect(page.locator('.header_label')).toHaveScreenshot('cart.png')

  });

  // verify the products details are aligned correctly
  test.only('verify product details', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage  = new LoginPage(page);
    await loginPage.login('visual_user','secret_sauce');

    await expect.soft(page.locator("//div[contains(text(),'Backpack')]//ancestor::div[@class='inventory_item']")).toHaveScreenshot('Backpack.png');
    await expect.soft(page.locator("//div[contains(text(),'Bolt T-Shirt')]//ancestor::div[@class='inventory_item']")).toHaveScreenshot('T-Shirt.png')

  });



