/* eslint-env jasmine, protractor */

const fs = require('fs');
//const os = require('os');
const now = new Date();
//const Url = require('url-parse');
//const argv = require('optimist').argv;
const Meta = require('./Meta.js');

class BrowserUtil {
/*    static verifyRelativePath(relativePath) {
        browser.getCurrentUrl().then((currentUrl) => {
            const parsedUrl = new Url(currentUrl);
            const msg = `failed: expected page url to be "${relativePath}" but instead found "${parsedUrl.pathname}"`;
            expect(parsedUrl.pathname).toContain(relativePath, msg);
        });
    }*/

    static isPageReady() {
        executeInBrowser(()=>{
            return document.readyState;
        }).then((isReady)=>{
            if (isReady != "complete") {
                browser.sleep(1000);
            }
        }).catch((err)=>{
            console.log("An error occurred while executing in the browser " + err );
        });
    }

    static waitForAlertBox() {
        browser.wait(() => browser.switchTo().alert().then(
            () => true,
            () => false));
    }

    static waitForConfirmBox() {
        browser.wait(() => browser.switchTo().alert().then(
            () => true,
            () => false));
    }

    static clickElementByTxt(cssValue, returnedTxt) {
        element.all(by.css(cssValue)).filter((elem, index) => {
            return elem.getText().then((text) => {
                return text === returnedTxt;
            });
        }).first().click();
        //BrowserUtil.outputBrowserLogs();
    }

    static clickElementByTxtMobile(cssSelector, returnedTxt) {
        element.all(by.css(cssSelector)).filter((elem, index) => {
            return elem.getText().then((text) => {
                return text === returnedTxt;
            });
        }).first().click();
    }

    static returnElementByTxt(cssValue, returnedTxt) {
        element.all(by.css(cssValue)).filter((elem, index) => {
            return elem.getText().then((text) => {
                return text === returnedTxt;
            });
        });
    }

    /*    static returnElementByTxt(cssValue, returnedTxt) {
            element.all(by.css(cssValue)).filter((elem, index) => {
                return elem.getText().then((text) => {
                    return text === returnedTxt;
                });
            });
        }*/

    static selectOptionFromDropMenu(option) {
        /*        const $optionToClick = $('option[value="' + option.toLowerCase().replace(/ /g, '-') + '"]');
                expect($optionToClick.waitReady()).toBeTruthy();
                $optionToClick.click();*/
        BrowserUtil.clickElementByTxtMobile(`option`, option);
    }

    static selectOptionFromDropMenuWithParent(parentElem, option) {
        const $optionToClick = parentElem.$('option[value="' + option.toLowerCase().replace(/ /g, '-') + '"]');
        expect($optionToClick.waitReady()).toBeTruthy();
        $optionToClick.click();
    }

    static isPageSettled(heroTitleTxt, heroTitle) {  // copyRightFooter

        if (!heroTitle) heroTitle = $('h1.hero-title');
        // if (!copyRightFooter) copyRightFooter = $(`p.footer-copyright`);  //todo commented out the footer

        expect(heroTitle.waitReady()).toBeTruthy();
        // todo Never check if heroTitle is something anymore,
        // todo now that we capture images and compare them
        browser.wait(() => heroTitle.getText().then(value =>
            value === heroTitleTxt));
        expect(heroTitle.getText()).toBe(heroTitleTxt);
        // expect(copyRightFooter.waitReady()).toBeTruthy();  //todo commented out the footer
    }

    static verifyMetaTagsAttributes(fr) {

        const metaTag = $(`html`);
        const headMetaTag = $$(`meta`).get(0);
        const linkMetaTag = $$(`link`).get(0);

        if (fr) {
            expect(metaTag.getAttribute('lang')).toEqual('fr-ca');
        } else {
            expect(metaTag.getAttribute('lang')).toEqual('en-ca');
        }
        expect(headMetaTag.getAttribute('content')).toEqual('IE=edge');
        expect(linkMetaTag.getAttribute('rel')).toEqual('stylesheet');
        expect(linkMetaTag.getAttribute('type')).toEqual('text/css');
        // expect(headMetaTag.getAttribute(`name`).toEqual(`msvalidate.01`));  //TODO follow up with Harmeet
        // expect(headMetaTag.getAttribute(`name`).toEqual(`robots`));  //TODO follow up with Harmeet
    }

/*    static outputBrowserLogs() {
        const timestamp = '/' + now.toDateString() + ' ' + now.getHours() + '-' + now.getMinutes() + '-';
        browser.manage().logs().get('browser').then(function (browserLog) {
            // console.log('LOG: ' + require('util').inspect(browserLog));
            fs.appendFile(`${os.userInfo().homedir}/fet-e2e/corp_sites/JS_logs/`
                + timestamp + `_logs.txt`,
                `================================${argv.env}======================================\n` +
                'LOG: ' + require('util').inspect(browserLog) + `\n`, function (err) {
                    if (err) throw err;
                    // console.warn(`Logs have been saved!`);
                });
        });
    }*/
}

module.exports = BrowserUtil;
