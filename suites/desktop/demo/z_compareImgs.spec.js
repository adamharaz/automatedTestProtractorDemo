/* eslint-env node, jasmine, protractor */
const Images = require('../../../helpers/Images.js');
const os = require('os');
const now = new Date();

xdescribe(`Compare all Images for GWL`, () => {

    const img = {
        imgTitles: [
            `indInsurnace`,
            `wealthMgmt`,
            `grpBenefits`,
            `grpRetirement`,
            `whoWeAre`,
            `corpSocialResponsibility`,
            `consumerInfo`,
            `financialInfo`,
            `governance`,
            `careers`,
            `companyHighlights`,
            `newsReleases`,
            `0_GWLProviderMap`,
        ],
    };

    for (let i = 0; i < img.imgTitles.length; i += 1) {
        const actualImg = `${os.userInfo().homedir}/fet-e2e/corp_sites/expected_images/gwl_desktop/`;
        const expectedImg = `${os.userInfo().homedir}/fet-e2e/corp_sites/actual_images/gwl_desktop/`;
        const diffImg = `${os.userInfo().homedir}/fet-e2e/corp_sites/image_differences/gwl_desktop/`
            + '/' + now.toDateString() + ' ' + now.getHours() + '-' + now.getMinutes() + '-';

        it(`Compare actual (${img.imgTitles[i]}) image to the expected (${img.imgTitles[i]}) image`, () => {
            Images.compareImages(`${expectedImg}${img.imgTitles[i]}.png`,
                `${actualImg}${img.imgTitles[i]}.png`,
                `${diffImg}${img.imgTitles[i]}_diffImg.png`,
                img.imgTitles[i]);
        });
    }
});


