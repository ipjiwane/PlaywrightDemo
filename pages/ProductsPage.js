exports.ProductsPage = class ProductsPage {

    constructor(page){
        this.page = page;
        this.hamburger_button = page.locator("//button[@id='react-burger-menu-btn']");
        this.logout_link = page.locator("//*[@id='logout_sidebar_link']")
        this.addToCart_buttons = page.$$("//button[text()='Add to cart']");
        this.cart_link = page.locator('.shopping_cart_link');
        
    }

    async goToCart(){
        await this.cart_link.click();
    }

    async logout(){
        await this.btn_Hamburger.click();
        await this.link_Logout.click();
    }

    async addProductsToCart() {
        for (let button of await this.addToCart_buttons){
            await button.click();
        }
    }


}
