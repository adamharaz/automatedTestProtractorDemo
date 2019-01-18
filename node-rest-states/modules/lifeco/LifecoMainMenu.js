/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
//const lhomePage =  require('../../page_objects/londonLife/LLHomePage.js');
//const llFaa     = require('../../page_objects/londonLife/LLFindAnAdvisor.js');


const firstName = 'Testing';
const lastName = 'Mobile';
//const faa = new llFaa();


class LifecoMainMenu {

    verifyMainmenu(mainMenu, subMenu, subSubMenu, subMenutitle, heroTitle) {
        expect(mainMenu.waitReady()).toBeTruthy();
        mainMenu.click();
        expect(subMenu.waitReady()).toBeTruthy();
        subMenu.click();
        expect(subSubMenu.waitReady()).toBeTruthy();
        subSubMenu.click();
        expect(subMenutitle.waitReady()).toBeTruthy();
        //browser.sleep(1000);
        expect(subMenutitle.getText()).toEqual(heroTitle);
        //browser.sleep(1000);
    };

    verifySingleMainmenu(mainMenu, subMenu, subMenutitle, heroTitle) {
        expect(mainMenu.waitReady()).toBeTruthy();
        mainMenu.click();
        expect(subMenu.waitReady()).toBeTruthy();
        subMenu.click();
        expect(subMenutitle.waitReady()).toBeTruthy();
        expect(subMenutitle.getText()).toEqual(heroTitle);
        //browser.sleep(2000);
    };


    clickGrid(grid,  heroTitle, expectedHeroTitle, expectedURL) {
        expect(grid.waitReady()).toBeTruthy();
        grid.click();
        //browser.sleep(1000);
        // expect(heroTitle.waitReady()).toBeTruthy();
        //browser.sleep(1000);
        // expect(heroTitle.getText()).toEqual(expectedHeroTitle);
        expect(browser.getCurrentUrl()).toEqual(expectedURL);
    }

    SubmitFAA(optionVal){
        expect(faa.$firstName.waitReady()).toBeTruthy();
        faa.$firstName.sendKeys('Testing');
        faa.$lastName.sendKeys('Mobile');
        faa.$email.sendKeys('adam.harris@gwl.ca');
        faa.$phoneNumber.sendKeys('6476439308');
        faa.$postalCode.sendKeys('M5H3B7');
        faa.$option1.click();
        faa.$option3.click();
        faa.$option7.click();
        if(optionVal === 'NO') {
            faa.$noButton.click();
            expect(faa.$sendReqButton.waitReady()).toBeTruthy();
            faa.$sendReqButton.click();
            expect(faa.$thankyouMsg_Name.waitReady()).toBeTruthy();
            expect(faa.$thankyouMsg_Name.getText()).toEqual('Testing Mobile');
        } else {
            faa.$yesButton.click();
            faa.$throughAdvisor.click();
            faa.$advisorName.sendKeys('Quality Assurance');
            faa.$yearBorn.sendKeys('1980');
            expect(faa.$sendReqButton.waitReady()).toBeTruthy();
            faa.$sendReqButton.click();
            expect(faa.$thankyouMsg_Name.waitReady()).toBeTruthy();
            expect(faa.$thankyouMsg_Name.getText()).toEqual('Testing Mobile');

        }
    }

    SubmitFAA_FR(optionVal){
        expect(faa.$firstName.waitReady()).toBeTruthy();
        faa.$firstName.sendKeys('Théodore');
        faa.$lastName.sendKeys('Chassériau');
        faa.$email.sendKeys('adam.harris@gwl.ca');
        faa.$phoneNumber.sendKeys('6476439308');
        faa.$postalCode.sendKeys('M5H3B7');
        faa.$option1.click();
        faa.$option3.click();
        faa.$option7.click();
        if(optionVal === 'NO') {
            faa.$noButton.click();
            expect(faa.$sendReqButton.waitReady()).toBeTruthy();
            faa.$sendReqButton.click();
            expect(faa.$thankyouMsg_Name.waitReady()).toBeTruthy();
            expect(faa.$thankyouMsg_Name.getText()).toEqual('Théodore Chassériau');
        } else {
            faa.$yesButton.click();
            faa.$throughAdvisor.click();
            faa.$advisorName.sendKeys('François-Léonard Dupont-Watteau');
            faa.$yearBorn.sendKeys('1980');
            expect(faa.$sendReqButton.waitReady()).toBeTruthy();
            faa.$sendReqButton.click();
            expect(faa.$thankyouMsg_Name.waitReady()).toBeTruthy();
            expect(faa.$thankyouMsg_Name.getText()).toEqual('Théodore Chassériau');

        }
    }

    clickDropDownMenu(text, subHeroTitle, expTitle) {
        BrowserUtil.selectOptionFromDropMenu(text);
        expect(subHeroTitle.waitReady()).toBeTruthy();
        expect(subHeroTitle.getText()).toBe(expTitle);
        //browser.sleep(1000);
    }

    clickSeniorOfficerGrid(grid, expofficerTitle, modelWin, modelWintitle, expModelWinTitle) {
        expect(grid.waitReady()).toBeTruthy();
        expect(grid.getText()).toContain(expofficerTitle);
        grid.click();
        //browser.sleep(1000);
        expect(modelWin.waitReady()).toBeTruthy();
        expect(modelWintitle.getText()).toEqual(expModelWinTitle);
        //browser.sleep(1000);
        modelWin.click();
        //browser.sleep(1000);
    }

    clickFinancialDropDownMenu(reportName, year, article, expTitle) {
        BrowserUtil.selectOptionFromDropMenu(reportName);
        BrowserUtil.selectOptionFromDropMenu(year);
        expect(article.getText()).toContain(expTitle);
        //browser.sleep(1000);
    }

    clickDropDownMenuIndex(dropDownEle,index){
       // var selectDropdownElement= element(by.id('contact-us-message-to'));
        dropDownEle.all(by.tagName('option'))
            .then(function (options) {
                options[index].click();
            });
    }

    clickCodeofConductGrid(grid, modelClose){
        expect(grid.waitReady()).toBeTruthy();
        grid.click();
        //browser.sleep(1000);
        expect(modelClose.waitReady()).toBeTruthy();
        modelClose.click();
        //browser.sleep(1000);
    }

    clickListViewCC(grid){
        expect(grid.waitReady()).toBeTruthy();
        grid.click();
    }

}

module.exports = LifecoMainMenu;