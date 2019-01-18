/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const Page = require(`../../page_objects/idea/HomePage.js`);


class Breadcrumbs {

    static verifyBreadcrumbs(breadcrumb1, breadcrumb2, breadcrumb3) {
        const page = new Page();

        expect(page.$breadcrumb1.getText()).toBe(breadcrumb1);
        expect(page.$breadcrumb2.getText()).toBe(breadcrumb2);
        expect(page.$breadcrumb3.getText()).toBe(breadcrumb3);
    }
}

module.exports = Breadcrumbs;