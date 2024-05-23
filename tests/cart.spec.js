import {test, expect} from "@playwright/test";
import LoginPage from "../pages/loginPage";

test('verify the presence of Quantity field on cart page', async ({page}) => {
    await page.goto("http://www.saucedemo.com");
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user","secret_sauce");

    //add product to cart
    const btnAddToCart = await page.locator("//button[text()='Add to cart']").elementHandles();

    for (let button of btnAddToCart){
        await button.click();
    }

    await page.locator('.shopping_cart_link').click();

    const quantity_elements = await page.locator("//div[@data-test='inventory-item']").all();
    for (let element of quantity_elements){
        await expect(element.locator("//*[text()='Remove']")).toHaveCount(1)
    }
})

test.only('verify cart empty message', async ({page}) => {
    await page.goto("http://www.saucedemo.com");
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user","secret_sauce");

    //add product to cart
    // const btnAddToCart = await page.locator("//button[text()='Add to cart']").elementHandles();

    // for (let button of btnAddToCart){
    //     await button.click();
    // }

    await page.locator('.shopping_cart_link').click();

    const quantity_elements = await page.locator("//*[text()='Remove']").elementHandles();
    for (let element of quantity_elements){
        await element.click()
    }

    await expect(page.locator("//*[text()='Your Cart is Empty.']")).toHaveCount(1);
})