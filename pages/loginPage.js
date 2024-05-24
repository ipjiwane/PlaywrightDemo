exports.LoginPage = class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.txtUsername = '//input[@id="user-name"]'
        this.txtPassword = '//input[@id="password"]'
        this.btnLogin = '//input[@id="login-button"]'
    }

    async login(username,password) {
        await this.page.fill(this.txtUsername,username);
        await this.page.fill(this.txtPassword,password);
        await this.page.click(this.btnLogin);
    }
}

// module.exports = LoginPage;