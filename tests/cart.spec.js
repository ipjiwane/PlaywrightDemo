const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");


test.beforeEach(async ({ page }) => {
    console.log("Running test..... '" + test.info().title + "'")
    await page.goto("http://www.saucedemo.com");
})


test('verify the presence of Quantity field on cart page', async ({ page }) => {

    //login
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");

    //add product to cart
    const productsPage = new ProductsPage(page)
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //verify quantity fields on cart page
    const cartPage = new CartPage(page);
    await cartPage.verifyQuantityFields();
})

//bug 30
test('verify cart empty message', async ({ page }) => {

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


//bug 31
test('verify checkout button for an empty cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");

    //add product to cart
    const productsPage = new ProductsPage(page)
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //cart page
    const cartPage = new CartPage(page);
    await cartPage.emptyCart();
    await cartPage.verifyCheckoutButton(false);
})


//bug 32
test('verify cart checkout button position', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("visual_user", "secret_sauce");

    const productsPage = new ProductsPage(page)
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //cart page
    const cartPage = new CartPage(page);
    await cartPage.verifyCheckOutButtonPosition();
})
