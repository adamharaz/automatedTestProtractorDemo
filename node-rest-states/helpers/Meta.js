const os = require('os');
const fs = require('fs');

/* eslint-env jasmine, protractor */

class Meta {

    static verifyMetaTagsAttributes(fr) {

        const metaTag = $(`html`);
        const headMetaTag = $(`meta[content="IE=edge"]`);
        const canonicalRel = $(`link[rel="canonical"]`);
        const hrefLang1 = $(`link[hreflang="fr-ca"]`);
        const hrefLang2 = $(`link[hreflang="en-ca"]`);
        const hrefLang3 = $(`link[hreflang="x-default"]`);
        const metaViewport = $(`meta[name="viewport"]`);
        const metaFormatDesc = $(`meta[name="format-detection"]`);
        const metaDesc = $(`meta[name="description"]`);
        const linkMetaTag1 = $(`link[rel="stylesheet"]`);
        const linkMetaTag2 = $(`link[type="text/css"]`);
        // const title = $(`head`).$(`title`);

        Meta.outputUrl();

        if (fr) {
            expect(metaTag.getAttribute('lang')).toEqual('fr-ca');
        } else {
            expect(metaTag.getAttribute('lang')).toEqual(`en-ca`);
        }

        expect(headMetaTag.isPresent()).toBe(true, `IE=edge is missing, see the above url `);
        expect(canonicalRel.isPresent()).toBe(true, `canonical is missing, see the above url `);
        expect(hrefLang1.isPresent()).toBe(true, `fr-ca is missing, see the above url `);
        expect(hrefLang2.isPresent()).toBe(true, `en-ca is missing, see the above url `);
        expect(hrefLang3.isPresent()).toBe(true, `x-default is missing, see the above url `);
        expect(metaViewport.isPresent()).toBe(true, `viewport is missing, see the above url `);
        expect(metaFormatDesc.isPresent()).toBe(true, `format-detection is missing, see the above url `);
        expect(metaDesc.isPresent()).toBe(true, `description is missing, see the above url `);
        expect(linkMetaTag1.isPresent()).toBe(true, `stylesheet is missing, see the above url `);
        expect(linkMetaTag2.isPresent()).toBe(true, `text/css is missing, see the above url `);
        /*        title.getText().then((titleTxt) => {
                    // console.log(`what is the title .... ${titleTxt}`);
                    //expect(titleTxt === "by").toBe(false); //todo
                    //expect(titleTxt === ">").toBe(false); //todo
                });*/
    }

    static outputUrl() {
        browser.getCurrentUrl().then((url) => {
            console.warn(`url:${url}`);
        });
    }

    static returnUrl() {
        browser.getCurrentUrl().then((url) => {
            return url;
        });
    }

    static returnCurrURL() {
        let urlPath;
        browser.getCurrentUrl().then((url) => {
            console.log(`url:${url}`);
            urlPath = url;
        });
        return urlPath;
    }
}

module.exports = Meta;
