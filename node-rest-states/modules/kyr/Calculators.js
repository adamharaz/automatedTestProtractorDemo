/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const BrowserFacade = require('../../helpers/BrowserFacade');
const $monthlyPaymentField = $(`input[id="form-field_18"]`);
const $interestRate = $(`input[id="form-field_23"]`);
const $noYears = $(`input[id="form-field_28"]`);
const $contributionVal = $$(`p.value`).get(0);
const $interestEarnedVal = $$(`p.value`).get(1);
const $calcButton = $(`button.button.button-primary`);

const $arrowDown = $(`select[name="form-field_12"]`);
const $age = $(`input[type="tel"]`);
const $isSmoker = $(`input[value="No"]`);


class Calculators {

    estimateRiskFor(whoseRisk) {
        // $arrowDown.click();
        $(`option[value="` + whoseRisk + `"]`).click();
    }

    calcRisk(age, gender, smoker) {
        const $isSmoker = $(`input[value="` + smoker + `"]`);
        $age.sendKeys(age);
        $(`option[value="` + gender + `"]`).click();
        browser.actions().mouseMove($isSmoker).click().perform();
    }

    calcRiskForMeAndPartner(age, gender, smoker, partnerAge, partnerGender, partnerSmoker, Fr) {
        // const $isSmoker = $(`input[value="` + smoker + `"]`);
        // const $isPartnerSmoker = $(`input[value="` + partnerSmoker + `"]`);

        const $isSmoker = element(by.xpath(`//input[contains(@type, "radio") and contains(@value, "` + smoker + `")]`));
        const $isPartnerSmoker = element(by.xpath(`//input[contains(@type, "radio") and contains(@value, "` + partnerSmoker + `")]`));

        if (!Fr) {
            this.estimateRiskFor(`Me and my spouse/partner`);
            BrowserUtil.clickElementByTxt(`button`, `Start`);
            BrowserFacade.isPageSettled();
        } else {
            this.estimateRiskFor(`Mon conjoint et moi`);
            BrowserUtil.clickElementByTxt(`button`, `Démarrer`);
            BrowserFacade.isPageSettled();
        }

        $age.sendKeys(age);
        $(`option[value="` + gender + `"]`).click();
        browser.actions().mouseMove($isSmoker).click().perform();
        if (!Fr) {
            BrowserUtil.clickElementByTxt(`button`, `Next`);
        } else {
            BrowserUtil.clickElementByTxt(`button`, `Page suivante`);
        }
        $age.sendKeys(partnerAge);
        $(`option[value="` + partnerGender + `"]`).click();
        BrowserFacade.isPageSettled();
        browser.actions().mouseMove($isPartnerSmoker).click().perform();

        if (!Fr) {
            BrowserUtil.clickElementByTxt(`button`, `Calculate`);
        } else {
            BrowserUtil.clickElementByTxt(`button`, `Calculer`);
        }
    }
}

module.exports = Calculators;