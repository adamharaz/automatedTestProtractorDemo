/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const Page = require(`../../page_objects/amex/HomePage.js`);
const Home = require(`./Home.js`);
const Breadcrumbs = require(`./Breadcrumbs.js`);


class Resources {

    static navToCard(resourceCard) {
        const page = new Page();

        BrowserUtil.clickElementByTxt(`h2.card-title`, resourceCard.toUpperCase());

        expect(page.$cardTitle.waitReady()).toBeTruthy();
        browser.wait(() => page.$cardTitle.getText().then(value =>
            value === resourceCard));
        expect(page.$cardTitle.getText()).toBe(resourceCard);
    }


    static verifiyResourceCard(cardTitle, previewTitle) {
        // ARRANGE
        Home.goHome();
        Resources.navToCard(cardTitle);

        // ACT
        BrowserUtil.clickElementByTxt(`h2.preview-title`, previewTitle);

        if (previewTitle === `A valuable lesson`) previewTitle = `A valuable lesson I learned`;  //ToDo Adam try a different way!

        // ASSERT
        Home.verifyArticleTitle(previewTitle);
        Breadcrumbs.verifyBreadcrumbs(`Home`, cardTitle, previewTitle);
        BrowserUtil.clickElementByTxt('p.card-anchor', 'Let\'s get started');
    }

    static verifiyResourceCardFr(cardTitle, previewTitle) {
        // ARRANGE
        Home.goHome(true);  //true for enabling French
        Resources.navToCard(cardTitle);

        // ACT
        BrowserUtil.clickElementByTxt(`h2.preview-title`, previewTitle);
        //if (previewTitle === `A valuable lesson`) previewTitle = `A valuable lesson I learned`;  //ToDo Adam try a different way!

        // ASSERT
        Home.verifyArticleTitle(previewTitle);
        Breadcrumbs.verifyBreadcrumbs(`Accueil`, cardTitle, previewTitle);
        if (!previewTitle === `L’assurance maladies graves peut être un choix sensé... si l’on sait voir petit`) {
            BrowserUtil.clickElementByTxt('p.card-anchor', `Commençons`);
        }
    }
}

module.exports = Resources;