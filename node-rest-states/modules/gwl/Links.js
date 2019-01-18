/* eslint-env jasmine, protractor */
const Navgations = require('../../page_objects/gwl/Navgations.js');
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const Nav = new Navgations();


class Links {

    constructor() {

        this.$heroTitle = $('h1.hero-title');


    }

    VerifyMain(link) {
        const Nav = new Navgations();

        expect(link.waitReady()).toBeTruthy();
        link.click();
        expect(Nav.$backBtn.waitReady()).toBeTruthy();
        Nav.$backBtn.click();
    };

    VerifySub(mainLink, subLink, textToVerify, burgerMenu, aboutUs) {


        if (burgerMenu) {
            // browser.sleep(900);
            expect(Nav.$searchMagnifierIcon.waitReady()).toBeTruthy();
            expect(Nav.$hamburgerBtn.waitReady()).toBeTruthy();
            Nav.$hamburgerBtn.click();
            expect(Nav.$hamburgerBtn.waitAbsent()).toBeTruthy();
        }
        expect(mainLink.waitReady()).toBeTruthy();
        mainLink.click();
        if (aboutUs) {
            //BrowserUtil.clickElementByTxt(`a`, `About us`);
            element(by.xpath(`/html/body/div[2]/nav[2]/div/div/div[3]/div[2]/div/ul/li[2]/div/ul[1]/li/a`)).click();
            subLink = textToVerify;
        }
        /*  expect(subLink.waitReady()).toBeTruthy();
          subLink.click();
          expect(subLink.waitAbsent()).toBeTruthy();*/
        BrowserUtil.clickElementByTxt(`a`, subLink);
        expect(this.$heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => this.$heroTitle.getText().then(value =>
            value === textToVerify));
        expect(this.$heroTitle.getText()).toBe(textToVerify);
    };

    VerifyCard(txt, navigateBack) {

        const $cardLink = element(by.cssContainingText('h2.card-heading', txt));

        expect($cardLink.waitReady()).toBeTruthy();
        $cardLink.click();
        expect($cardLink.waitAbsent()).toBeTruthy();
        expect(this.$heroTitle.waitReady()).toBeTruthy();
        if (txt === 'Health & dental insurance') {
            txt = 'Health and dental insurance'
        }
        expect(this.$heroTitle.getText()).toBe(txt);
        if (navigateBack) {
            browser.navigate().back();
        }
    }

    VerifySearchCard(txt, txtToVerify, navigateBack) {
        const $searchCardLink = element(by.cssContainingText('h2', txt));

        expect($searchCardLink.waitReady()).toBeTruthy();
        $searchCardLink.click();
        expect($searchCardLink.waitAbsent()).toBeTruthy();
        expect(this.$heroTitle.waitReady()).toBeTruthy();
        expect(this.$heroTitle.getText()).toBe(txtToVerify);
        if (navigateBack) {
            browser.navigate().back();
        }
    }

    VerifySearchCardWithNewTab(txt, expectedUrl, navigateBack) {
        const $searchCardLinkWithNewTab = element(by.cssContainingText('h2', txt));

        expect($searchCardLinkWithNewTab.waitReady()).toBeTruthy();
        $searchCardLinkWithNewTab.click();
        expect($searchCardLinkWithNewTab.waitAbsent()).toBeTruthy();
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]).then(function () {
                expect(browser.getCurrentUrl()).toEqual(expectedUrl);
            });
        });
        if (navigateBack) {
            browser.navigate().back();
        }
    }

    selectContactUsOption(option) {
        const $optionLink = element(by.cssContainingText('option', option));

        // browser.sleep(1200);
        expect(Nav.$contactUsMenu.waitReady()).toBeTruthy();
        Nav.$contactUsMenu.click();
        // browser.sleep(1200);  //ToDo remove
        expect($optionLink.waitReady()).toBeTruthy();
        $optionLink.click();
    }

    verifyContactUsLinks(linkToUse, expectedUrl, navigateBack) {
        const $contactUsLink = element(by.cssContainingText('a', linkToUse));

        expect($contactUsLink.waitReady()).toBeTruthy();
        $contactUsLink.click();
        browser.sleep(900);
        // expect($contactUsLink.waitAbsent()).toBeTruthy();
        expect(browser.getCurrentUrl()).toEqual(expectedUrl);

        expect(this.$heroTitle.waitReady()).toBeTruthy();
        expect(this.$heroTitle.getText()).not.toEqual('Sorry, the page you\'re looking for doesn\'t exist');


        if (navigateBack) {
            browser.navigate().back();
        }
    }
}

module.exports = Links;