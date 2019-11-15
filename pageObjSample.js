/* eslint-env jasmine, protractor */

class Footer {
    constructor() {
        this.$footerSection = $('footer[id="site_footer"]').$('p');

        this.$privacyLink = $('a[href="https://uat.canadalife.com/privacy/privacy-policy.html"]');
        this.$legalLink = $$('ul.menu-footer-menu').get(0).$$('li').get(1).$('a');
        this.$internetSecurityLink = $$('ul.menu-footer-menu').get(0).$$('li').get(2).$('a');
        this.$financialInfoFooterLink = $$('ul.menu-footer-menu').get(0).$$('li').get(3).$('a');
    }
}

module.exports = Footer;




