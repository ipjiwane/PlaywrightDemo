const { test, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/loginPage");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

const test_data = JSON.parse(JSON.stringify(require("../test-data.json")))

test.beforeEach(async ({ page }) => {
    console.log("Running test.... " + test.info().title);
    await page.goto("http://www.saucedemo.com");
})


test('validate user information fields', async ({ page }) => {
    //login to app
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    //add products
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //proceed to checkout
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    //checkout page
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.validateUserInformationInputFields();
})


//bug 35
test('validate error cross symbol for fields with valid values', async ({ page }) => {
    //login to app
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    //add products
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    //proceed to checkout
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    //checkout page
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.validateEmptyFieldError();

})

test.describe('Verify last name field on checkout page', () => {

    for (let data of test_data) {
        test('Verify last name field is editable for '+data.username, async ({ page }) => {
            //login to app
            const loginPage = new LoginPage(page);
            await loginPage.login(data.username, data.password);

            //add products
            const productsPage = new ProductsPage(page);
            await productsPage.addProductsToCart();
            await productsPage.goToCart();

            //proceed to checkout
            const cartPage = new CartPage(page);
            await cartPage.proceedToCheckout();

            //checkout page
            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.verifyLastNameFieldisEditable();

        })
    }
})


test.describe.only('Verify checkout user information fields', () => {

    for (let data of test_data) {
        test.only('Verify user information fields are mandatory for '+ data.username, async ({ page }) => {
            //login to app
            const loginPage = new LoginPage(page);
            await loginPage.login(data.username, data.password);

            //add products
            const productsPage = new ProductsPage(page);
            await productsPage.addProductsToCart();
            await productsPage.goToCart();

            //proceed to checkout
            const cartPage = new CartPage(page);
            await cartPage.proceedToCheckout();

            //checkout page
            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.verifyUserInformationFieldsMandatory();
        })
    }
})


