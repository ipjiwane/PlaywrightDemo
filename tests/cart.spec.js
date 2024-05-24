const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");

test.only('verify the presence of Quantity field on cart page', async ({ page }) => {

    //goto url
    await page.goto("http://www.saucedemo.com");

    //login
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");

    //add product to cart
    const productsPage = new ProductsPage(page)
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //verify the presence of qty fields for all the added products
    // const quantity_elements = await page.locator("//div[@data-test='inventory-item']").all();
    // for (let element of quantity_elements) {
    //     // await expect(element.locator("//*[text()='Remove']")).toBeVisible();
    //     await expect(element.locator("//*[text()='Quantity']")).toBeVisible();
    // }

    const cartPage = new CartPage(page);
    await cartPage.verifyQuantityFields();
})

test('verify cart empty message', async ({ page }) => {

    //navigate to url
    await page.goto("http://www.saucedemo.com");

    //login to app
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");

    //add products to cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //cart page
    const cartPage = new CartPage(page);
    await cartPage.emptyCart();
    await cartPage.verifyEmptyCartMessage();
})
