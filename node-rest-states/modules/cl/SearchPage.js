/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $searchField = $('input[name="query"]');
const $manginifierBtn = element(by.xpath('//*[@id="nav"]/div/div[2]/form/button/span[2]'));

class SearchPage {

    searchByKeyword(keyword) {
        expect($searchField.waitReady()).toBeTruthy();
        $searchField.sendKeys(keyword);
        // browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(1500);
        $manginifierBtn.click();
        /*   BrowserUtil.clickElementByTxt('a.preview-anchor', keyword);
           browser.sleep(1500);*/
        /*     expect($heroTitle.waitReady()).toBeTruthy();
             browser.wait(() => $heroTitle.getText().then(value =>
                 value === keyword));
             expect($heroTitle.getText()).toBe(keyword);*/
    }
}

module.exports = SearchPage;