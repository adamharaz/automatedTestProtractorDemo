/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $heroTitle = $('h1.hero-title');


class KeynotesSpeakers {

    verifyKeynotesSpeaker(speaker, id) {

        const $keynoteSpeaker = element(by.xpath('//*[@id="' + id + '"]/div/div[1]/div[2]/div[2]/h1'));


        BrowserUtil.clickElementByTxt('p', speaker);

        if (speaker === 'Earvin “Magic” Johnson'){
            speaker = 'Earvin "Magic" Johnson';
        }

        expect($keynoteSpeaker.waitReady()).toBeTruthy();
        browser.wait(() => $keynoteSpeaker.getText().then(value =>
            value === speaker));
        expect($keynoteSpeaker.getText()).toBe(speaker);

        BrowserUtil.clickElementByTxt('span.close-text', 'Close');
        expect($heroTitle.getText()).toBe('Canada Life Platinum Symposium');

    }
}

module.exports = KeynotesSpeakers;