class HomePage {

    constructor(page){
        this.page = page;
        this.btn_Hamburger = "//button[@id='react-burger-menu-btn']"
        this.link_Logout = "//*[@id='logout_sidebar_link']"
        
    }

    async logout(){
        await this.page.click(this.btn_Hamburger );
        await this.page.click(this.link_Logout);
    }
}

module.exports = HomePage;