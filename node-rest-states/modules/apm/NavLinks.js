/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');


class NavLinks {


    verifyUpperLinks(link) {
        const $header = $('h2[id=' + link.replace(' ', '').toLowerCase() + ']');

        expect($burgerMenu.waitReady()).toBeTruthy();
        $burgerMenu.click();
        BrowserUtil.clickElementByTxt('a', link);
        expect($header.waitReady()).toBeTruthy();
        browser.wait(() => $header.getText().then(value =>
            value === link));
        expect($header.getText()).toBe(link);
        expect($heroTitle.getText()).toBe('Canada Life Platinum Symposium');
        browser.navigate().back();
    };

    verifyhNavLinksDesktop(i,link) {

        const $header = $('h2[id=' + link.replace(' ', '').toLowerCase() + ']');
        const $navLink = $('ul.nav-anchor-list').$$('li.nav-anchor-item').get(i);

        expect($navLink.waitReady()).toBeTruthy();
        $navLink.click();
        expect($header.waitReady()).toBeTruthy();
        browser.wait(() => $header.getText().then(value =>
            value === link));
        expect($header.getText()).toBe(link);
        browser.navigate().back();
        expect($heroTitle.getText()).toBe('Canada Life Platinum Symposium');
    };

    verifyFrenchNavLinks(link, txt) {

        const $header = $('h2[id=' + link.replace(' ', '').toLowerCase() + ']');

        expect($burgerMenu.waitReady()).toBeTruthy();
        $burgerMenu.click();
        BrowserUtil.clickElementByTxt('a', txt);
        expect($header.waitReady()).toBeTruthy();
        browser.wait(() => $header.getText().then(value =>
            value === txt));
        expect($header.getText()).toBe(txt);
        expect($heroTitle.getText()).toBe('Canada Vie Symposium Platine');
        browser.navigate().back();
    };

    verifyFrenchNavLinksDesktop(i,link, txt) {

        const $header = $('h2[id=' + link.replace(' ', '').toLowerCase() + ']');
        const $navLink = $('ul.nav-anchor-list').$$('li.nav-anchor-item').get(i);

        expect($navLink.waitReady()).toBeTruthy();
        $navLink.click();
        expect($header.waitReady()).toBeTruthy();
        browser.wait(() => $header.getText().then(value =>
            value === txt));
        expect($header.getText()).toBe(txt);
        browser.navigate().back();
        expect($heroTitle.getText()).toBe('Canada Vie Symposium Platine');
    };
}

module.exports = NavLinks;