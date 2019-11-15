/* eslint-env node, jasmine, protractor */
const Navgations = require('../../../page_objects/gwl/Navgations.js');
const BrowserUtil = require('../../../helpers/BrowserUtil.js');
const Links = require('../../../modules/apm/NavLinks.js');
const Meta = require('../../../helpers/Meta.js');

describe('APM French Nav links', () => {
    const Nav = new Navgations();
    const NavLinks = new Links();
    const $heroTitle = $('h1.hero-title');

    it('should load APM website using Safari', () => {
        browser.driver.get(baseUrlFrAPM);
        expect($heroTitle.waitReady()).toBeTruthy();
        expect($heroTitle.getText()).toBe('Canada Vie Symposium Platine');
    });
    it('should navigate to (Programme) Nav Link', () => {
        NavLinks.verifyFrenchNavLinksDesktop('0', 'Agenda', 'Programme');
    });
    it('should navigate to (Emplacement) Nav Link', () => {
        NavLinks.verifyFrenchNavLinksDesktop('1', 'Venue', 'Emplacement');
    });
    it('should navigate to (Pour nous joindre) Nav Link', () => {
        NavLinks.verifyFrenchNavLinksDesktop('2', 'Contact us', 'Pour nous joindre');
    });
    it('should navigate to (Conférenciers invités) Nav Link', () => {
        NavLinks.verifyFrenchNavLinksDesktop('3', 'Keynote speakers', 'Conférenciers invités');
    });

    it('should verify Meta Tags Attributes', () => {
        Meta.verifyMetaTagsAttributes(true);
    });
});
