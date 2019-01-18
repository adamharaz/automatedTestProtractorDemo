/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $monthlyPaymentField = $(`input[id="form-field_18"]`);
const $interestRate = $(`input[id="form-field_23"]`);
const $noYears = $(`input[id="form-field_28"]`);
const $contributionVal = $$(`p.value`).get(0);
const $interestEarnedVal = $$(`p.value`).get(1);
const $calcButton = $(`button.button.button-primary`);

const $contributionInterestRateField = $(`input[id="form-field_18"]`);
const $yearsOfInvestmentField = $(`input[id="form-field_23"]`);
const $savedAlreadyField = $(`input[id="form-field_27"]`);
const $futureSavingField = $(`input[id="form-field_32"]`);
const $savingResultsVal = $(`span.value`);

const $ageField = $(`input[id="form-field_18"]`);
const $retiringAgeField = $(`input[id="form-field_22"]`);
const $annualIncomeField = $(`input[id="form-field_30"]`);
const $annualIncomePercentageField = $(`input[id="form-field_35"]`);
const $preretirementRateField = $(`input[id="form-field_48"]`);

const $annualRateField = $(`input[id="form-field_31"]`);
const $currentTotalRetirementSavings = $(`input[id="form-field_26"]`);
const $lookingToWithdrawNow = $(`input[id="form-field_36"]`);

const $balanceOwedField = $(`input[id="form-field_18"]`);
const $monthlyPaymentAmtField = $(`input[id="form-field_28"]`);
const $additionalMonthlyPaymentField = $(`input[id="form-field_33"]`);
const $annualInterestRateIfInvest = $(`input[id="form-field_38"]`);


class Calculators {
    calcMyCompoundInterest(monthlyPayment, interestRate, monthlySavings, contributionVal, interestVal, Fr) {
        $monthlyPaymentField.clear();
        $interestRate.clear();
        $noYears.clear();
        $monthlyPaymentField.sendKeys(monthlyPayment);
        $interestRate.sendKeys(interestRate);
        $noYears.sendKeys(monthlySavings);
        $calcButton.click();

        if (!Fr) {
            BrowserUtil.isPageSettled(`Your contributions in ${monthlySavings} years will be:`, $(`p.h4`));
        } else {
            BrowserUtil.isPageSettled(`Dans ${monthlySavings} ans , le total de vos versements pourrait s’élever à:`, $(`p.h4`));
        }
        expect($contributionVal.getText()).toBe(contributionVal,
            `Contribution Value is Probably Wrong!`);
        expect($interestEarnedVal.getText()).toBe(interestVal,
            `Interest Rate Value is Probably Wrong!`);
    };

    calcMySavings(interestRate, investmentYears, saving, futureSaving, expectedResult) {
        $contributionInterestRateField.clear();
        $yearsOfInvestmentField.clear();
        $savedAlreadyField.clear();
        $futureSavingField.clear();

        $contributionInterestRateField.sendKeys(interestRate);
        $yearsOfInvestmentField.sendKeys(investmentYears);
        $savedAlreadyField.sendKeys(saving);
        $futureSavingField.sendKeys(futureSaving);
        $calcButton.click();
        expect($savingResultsVal.getText()).toBe(expectedResult,
            `Results are different than anticipated, please double check!`);
    }

    calcMyRetirementSavings(age, retirementAge, annualIncome, annualIncomePercentage, retirementRate, contribution, expectedAnnualIncome, Fr) {

        $ageField.clear();
        $retiringAgeField.clear();
        $annualIncomeField.clear();
        $annualIncomePercentageField.clear();
        $preretirementRateField.clear();


        $ageField.sendKeys(age);
        $retiringAgeField.sendKeys(retirementAge);
        $annualIncomeField.sendKeys(annualIncome);
        $annualIncomePercentageField.sendKeys(annualIncomePercentage);
        $preretirementRateField.sendKeys(retirementRate);

        $calcButton.click();

        if (!Fr) {

            expect($(`p.h4`).getText()).toBe(`Your contributions in ${retirementAge - age} years could be`,
                `Results are different than anticipated, please double check!`);

            expect($(`p.value`).getText()).toBe(contribution,
                `Results are different than anticipated, please double check!`);

            expect($(`span.value-list-value`).getText()).toBe(expectedAnnualIncome,
                `Results are different than anticipated, please double check!`);
        } else {
            expect($(`p.h4`).getText()).toBe(`Dans ${retirementAge - age} ans, le total de vos versements pourrait s’élever à :`,
                `Results are different than anticipated, please double check!`);

            expect($(`p.value`).getText()).toBe(contribution,
                `Results are different than anticipated, please double check!`);

            expect($(`span.value-list-value`).getText()).toBe(expectedAnnualIncome,
                `Results are different than anticipated, please double check!`);

            //
        }
    }

    calcMyRetirementSavings2(age, retirementAge, annualRate, retirementSavings, totalWithdraw, Fr) {

        $ageField.clear();
        $retiringAgeField.clear();
        $annualRateField.clear();
        $currentTotalRetirementSavings.clear();
        $lookingToWithdrawNow.clear();


        $ageField.sendKeys(age);
        $retiringAgeField.sendKeys(retirementAge);
        $annualRateField.sendKeys(annualRate);
        $currentTotalRetirementSavings.sendKeys(retirementSavings);
        $lookingToWithdrawNow.sendKeys(totalWithdraw);

        $calcButton.click();


        if (!Fr) {


            expect($$(`p.value`).get(0).getText()).toBe(`If you withdraw $${totalWithdraw}.00`,
                `Results are different than anticipated, please double check!`);
            expect($$(`p.value`).get(1).getText()).toBe(`$${retirementSavings}.00`,
                `Results are different than anticipated, please double check!`);

            /*  expect($(`span.value-list-value`).getText()).toBe(expectedAnnualIncome,
                  `Results are different than anticipated, please double check!`);*/
        } else {


            expect($$(`p.value`).get(0).getText()).toBe(`Si vous retiriez ${totalWithdraw.replace(`,`, ` `)},00 $`,
                `Results are different than anticipated, please double check!`);
            expect($$(`p.value`).get(1).getText()).toBe(`${retirementSavings.replace(`,`, ` `)},00 $`,
                `Results are different than anticipated, please double check!`);

            //Si vous retiriez

        }
    }

    calcMyInvestment(owedBalance, interestRate, monthlyPaymentAmt, additionallyMonthlyPayment, annualInterestRateIfInvest,
                     period, expectedDebt, expectedInvestment, remainingInvestment, Fr) {

        $balanceOwedField.clear();
        $interestRate.clear();
        $monthlyPaymentAmtField.clear();
        $additionalMonthlyPaymentField.clear();
        $annualInterestRateIfInvest.clear();


        $balanceOwedField.sendKeys(owedBalance);
        $interestRate.sendKeys(interestRate);
        $monthlyPaymentAmtField.sendKeys(monthlyPaymentAmt);
        $additionalMonthlyPaymentField.sendKeys(additionallyMonthlyPayment);
        $annualInterestRateIfInvest.sendKeys(annualInterestRateIfInvest);

        $calcButton.click();


        if (!Fr) {

            expect($$(`p.value`).get(0).getText()).toBe(period,
                `Period is different than anticipated, please double check!`);
            expect($$(`p.value-list-item`).get(0).$(`span.value-list-value`).getText()).toBe(expectedDebt,
                `Debt is different than anticipated, please double check!`);
            expect($$(`p.value-list-item`).get(1).$(`span.value-list-value`).getText()).toBe(expectedInvestment,
                `Expected Investment is different than anticipated, please double check!`);
            expect($$(`p.value`).get(1).getText()).toBe(remainingInvestment ,
                `remaining investment is different than anticipated, please double check!`);

            /*  expect($(`span.value-list-value`).getText()).toBe(expectedAnnualIncome,
                  `Results are different than anticipated, please double check!`);*/
        } else {


            expect($$(`p.value`).get(0).getText()).toBe(`Si vous retiriez ${totalWithdraw.replace(`,`, ` `)},00 $`,
                `Results are different than anticipated, please double check!`);
            expect($$(`p.value`).get(1).getText()).toBe(`${retirementSavings.replace(`,`, ` `)},00 $`,
                `Results are different than anticipated, please double check!`);

            //Si vous retiriez

        }
    }
}

module.exports = Calculators;