const {expect} = require("@playwright/test");

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.checkout_button = page.locator("#checkout");
        this.continue_button = page.locator("#continue-shopping");
        this.remove_buttons = page.$$("//*[text()='Remove']");
        this.empty_cart_message = page.locator("//*[text()='Your Cart is Empty.']");
        this.quantity_elements = page.locator("//div[@data-test='inventory-item']").all();
    }

    //function to verify if the checkout button is present or not
    async verifyCheckoutButton(status) {
        if (status) {
            await expect(this.checkout_button).toBeVisible();
        } else if (!status) {
            await expect(this.checkout_button).not.toBeVisible();
        }
    }

    async emptyCart() {
        for (let button of await this.remove_buttons) {
            await button.click()
        }
    }

    async verifyEmptyCartMessage(){
        await expect(this.empty_cart_message).toBeVisible();
    }

    async verifyQuantityFields() {
        // const quantity_elements = await page.locator("//div[@data-test='inventory-item']").all();
        for (let element of await this.quantity_elements) {
            // await expect(element.locator("//*[text()='Remove']")).toBeVisible();
            await expect(element.locator("//*[text()='Quantity']")).toBeVisible();
        }
    }
}