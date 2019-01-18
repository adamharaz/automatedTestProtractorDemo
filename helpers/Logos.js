/* eslint-env jasmine, protractor */
const CareersPage = require('../page_objects/careers/CareersPage.js');

class Logos {

static VerifyFooter  (footerLogo,  heroTitleText , heroTitleText2) {
    const Page = new CareersPage();
    expect(footerLogo.isDisplayed()).toBeTruthy();
    footerLogo.click();
    expect(Page.$heroTitle.waitReady()).toBeTruthy();
    expect(Page.$heroTitle.getText()).toBe(heroTitleText);
    browser.navigate().back();
    Page.waitForReady();
    if (heroTitleText2) {
        expect(Page.$heroTitle.getText()).toBe(heroTitleText2);
    }else{
        // expect(Page.$heroTitle.getText()).toBe('Discover your opportunity');
    }
  };
}

module.exports = Logos;