class BrowserFacade {

    constructor() {
        console.log('Offering you a peace of mind. ');
    }


    static getAllClickables() {
        return this.executeInBrowser(() => {
            let array = [];
            let aTags = document.getElementsByTagName("a");

            for (let i = 0; i < aTags.length; i++) {
                let obj = {
                    text: aTags[i].innerText,
                    url: aTags[i].href,
                    classNames: aTags[i].className,
                };
                array.push(obj);
            }
            return array;
        }).then((array) => {
            console.log(JSON.stringify(array));
            return array;
        }).catch((err) => {
            console.log('An error occurred when retrieving all cliclkables >> ' + err);
        });
    }


    //this verify the url but ignores the home page.
    static verifyUrl(baseURL,destUrl) {
        browser.getCurrentUrl().then((url) => {
            if (url != `${baseURL}`) {
                expect(browser.getCurrentUrl()).toEqual(`${destUrl}`);
            }
        }).catch((err) => {
            console.log('Error occurred in Current URL ');
        });
    }


    static isPageSettled() {
        this.executeInBrowser(() => {
            // window.alert(`.....just write anything ....`);
            return document.readyState;
        }).then((isReady) => {
            if (isReady != "complete") {
                console.warn("It is NOT ready yet!" + isReady);
                browser.sleep(900);
            }
        }).catch((err) => {
            console.log("An error occurred while executing in the browser " + err);
        });
    }


    static executeInBrowser(cb) {
        return browser.executeScript(cb);
    }
}


module.exports = BrowserFacade;