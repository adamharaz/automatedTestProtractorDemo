/* eslint-env node, jasmine, protractor */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const Jasmine2HtmlReporter = require("protractor-jasmine2-html-reporter");
const argv = require('optimist').argv;
const os = require(`os`);

const disableAngularPageStateDetection = () => {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
};

// Reference: https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js

const useFancyReporter = () => {
    const specReporter = new SpecReporter({
        displayStacktrace: 'all',
    });

    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(specReporter);
};

const config = {
    //seleniumAddress: 'http://localhost:4723/wd/hub',
    seleniumAddress: 'https://hub-cloud.browserstack.com/wd/hub',
    //specs: ['suites/mobile/glc/*.spec.js'],
    suites: {
        atm: 'suites/mobile/atm/*.spec.js',
        gwl: 'suites/mobile/gwl/*.spec.js',
        rfp: 'suites/mobile/rfp/*.spec.js',
        glc: 'suites/mobile/glc/*.spec.js',
        quad: 'suites/mobile/quadrus/*.spec.js',
        apm: 'suites/mobile/apm/*.spec.js',
        cl: 'suites/mobile/cl/*.spec.js',
        ll: 'suites/mobile/ll/*.spec.js',
        careers: 'suites/mobile/careers/*.spec.js',
        amex: 'suites/mobile/amex/*.spec.js',
        canadore: 'suites/mobile/canadore/*.spec.js',
        laurentianu: 'suites/mobile/laurentianu/*.spec.js',
        lifeco: `suites/mobile/lifeco/*.spec.js`,
        horizon: `suites/mobile/horizon/*.spec.js`,
        any: `suites/any/*.spec.js`,
    },

    /*capabilities: {
        browserName: 'safari',
        platformName: 'iOS',
        platformVersion: 11.2,
        deviceName: 'iPhone Simulator'
    },*/

    'capabilities': {
        'browserstack.user': 'mattsim1',
        'browserstack.key': 'hPhZpxCye8jfkZEFUcqc',
        'browserName': 'safari',
        'device': 'iPhone 7',
        'realMobile': 'true',
        'os_version': '11.0'
    },

    multiCapabilities: {
        shardTestFiles: true,
        maxInstances: 30,    //use 30 instances
    },

    onPrepare: () => {
        if (argv.env) setBaseURL(argv.env);
        require('./helpers/waitReady.js');  // eslint-disable-line global-require
        require('./helpers/waitAbsent.js'); // eslint-disable-line global-require
        disableAngularPageStateDetection();
        setupReporters();
        console.warn('============ Mobile Mode ================');
    },

    jasmineNodeOpts:
        {
            defaultTimeoutInterval: 100000, // 10 seconds
        },
};

const setBaseURL = (env) => {
    switch (env) {
        case 'careers_pr':
            baseUrl = 'https://careers.greatwestlife.com/';
            heroTxt = `Discover your opportunity`;
            heroTxtFr = `Saisissez l’occasion de jouer un rôle clé`;
            environment = 'www';
            break;
        case 'careers_uat':
            baseUrl = `https://gwl:gwl@uat.careers.greatwestlife.com/`;
            environment = 'uat';
            heroTxt = `Discover your opportunity`;
            heroTxtFr = `Saisissez l’occasion de jouer un rôle clé`;
            break;
        case  'careers_qa':
            baseUrl = 'https://qa.careers.greatwestlife.com/';
            environment = 'qa';
            break;
        case `quad_qa`:
            baseUrlQuad = 'https://gwl:gwl@qa.quadrusinvestmentservices.com/';
            baseUrlFrQuad = `https://gwl:gwl@qa.quadrusinvestmentservices.com/fr.html`;
            heroTxtQuad = `Your message was successfully delivered!`;
            heroTxtFrQuad = `Nous aidons les investisseurs de fonds communs à bâtir un avenir financier prospère`;
            environment = 'qa';
            auth = `gwl:gwl@qa`;
            break;
        case 'any_mo':
            environment = 'www';
            break;
        case  'gwl_pr':
            baseUrl = 'https://www.greatwestlife.com/';
            environment = 'www';
            heroTxt = `Get simple coverage`;
            heroTxtFr = `Protégez vos proches, simplement et à moindre coût`;
            break;
        case  'gwl_uat':
            baseUrl = 'https://gwl:gwl@uat.greatwestlife.com/';
            environment = 'uat';
            heroTxt = `Get simple coverage`;
            heroTxtFr = `Protégez vos proches, simplement et à moindre coût`;
            break;
        case  'gwl_qa':
            baseUrlGWL = 'https://gwl:gwl@qa.greatwestlife.com/';
            baseUrlFrGWL = `https://gwl:gwl@qa.greatwestlife.com/fr/vous-et-votre-famille.html`;
            environment = 'qa';
            heroTxtGWL = `Get simple coverage`;
            heroTxtFrGWL = `Protégez vos proches, simplement et à moindre coût`;
            auth = `gwl:gwl@qa`;
            break;
        case  'glc_pr':
            baseUrl = 'https://www.glc-amgroup.com/';
            heroTxt = `Why GLC`;
            heroTxtFr = `Pourquoi choisir GLC`;
            environment = 'www';
            break;
        case  'glc_uat':
            baseUrl = 'https://uat.glc-amgroup.com/';
            heroTxt = `Why GLC`;
            heroTxtFr = `Pourquoi choisir GLC`;
            environment = 'uat';
            break;
        case  'glc_qa':
            baseUrl = 'https://qa.glc-amgroup.com/';
            environment = 'qa';
            break;
        case  'horizon_pr':
            baseUrl = 'https://www.myhorizon.ca/myhorizon.html';
            baseUrlFr = 'https://www.monhorizon.ca/monhorizon.html';
            heroTxt = `Make the most of your financial future!`;
            heroTxtFr = `Faites fructifier votre avenir financier`;
            environment = 'www';
            break;
        case  'horizon_uat':
            baseUrl = 'https://uat.myhorizon.ca/myhorizon.html';
            baseUrlFr = 'https://uat.monhorizon.ca/monhorizon.html';
            heroTxt = `Make the most of your financial future!`;
            heroTxtFr = `Faites fructifier votre avenir financier`;
            environment = 'uat';
            break;
        case 'quad_pr':
            baseUrlQuad = 'https://www.quadrusinvestmentservices.com/';
            baseUrlFrQuad = `https://www.quadrusinvestmentservices.com/fr.html`;
            heroTxtQuad = `Your message was successfully delivered!`;
            heroTxtFrQuad = `Nous aidons les investisseurs de fonds communs à bâtir un avenir financier prospère`;
            environment = 'www';
            break;
        case 'quad_uat':
            baseUrl = 'https://gwl:gwl@uat.quadrusinvestmentservices.com/';
            environment = 'uat';
            break;
        case  'apm_uat':
            baseUrl = 'https://gwl:gwl@uat.program.canadalife.com/platinum/';
            environment = 'uat';
            break;
        case  'apm_pr':
            baseUrl = 'https://program.canadalife.com/platinum/';
            environment = 'www';
            break;
        case  'cl_qa':
            baseUrl = 'https://qa.canadalife.com/';
            environment = 'qa';
            break;
        case  'cl_uat':
            baseUrl = 'https://gwl:gwl@uat.canadalife.com/';
            environment = 'uat';
            heroTxt = `Help protect your family, build up cash value`;
            heroTxtFr = `Aidez à protéger votre famille tout en accumulant une valeur de rachat`;
            break;
        case  'cl_pr':
            baseUrlCL = 'https://www.canadalife.com/';
            environment = 'www';
            heroTxtCL = `Help protect your family, build up cash value`;
            heroTxtFrCL = `Aidez à protéger votre famille tout en accumulant une valeur de rachat`;
            break;
        case  'll_pr':
            baseUrlLL = 'https://www.londonlife.com/';
            baseUrlLLFr = 'https://www.londonlife.com/fr.html';
            heroTxtLL = `Making sense of market cycles`;
            heroTxtFrLL = `Comprendre les cycles du marché`;
            environment = 'www';
            auth = `www`;
            break;
        case  'll_uat':
            baseUrl = 'https://gwl:gwl@uat.londonlife.com/';
            heroTxt = `Mutual funds or segregated funds?`;
            heroTxtFr = `Fonds communs de placement ou fonds distincts?`;
            environment = 'uat';
            break;
        case  'amex_pr':
            baseUrl = 'https://www.canadalifeinsure.ca/amex/';
            environment = 'www';
            heroTxt = `AMEX insurance`;
            heroTxtFr = `Assurance AMEX`;
            break;
        case  'amex_uat':
            baseUrl = 'https://gwl:gwl@uat.canadalifeinsure.ca/amex/';
            environment = 'uat';
            heroTxt = `AMEX insurance`;
            heroTxtFr = `Assurance AMEX`;
            break;
        case  'atm_pr':
            baseUrl = 'https://www.advisory-network.ca/';
            environment = 'www';
            heroTitleTxt = `We’ll succeed by working together`, heroTitleTxtFr = `Travailler ensemble pour réussir`;
            break;
        case  'atm_uat':
            baseUrl = 'https://uat.advisory-network.ca/';
            environment = 'www';
            heroTitleTxt = `We’ll succeed by working together`, heroTitleTxtFr = `Travailler ensemble pour réussir`;
            break;
        case  'laurentianu_pr':
            baseUrl = 'https://www.canadalifeinsure.ca/laurentianu/';
            environment = 'www';
            break;
        case  'laurentianu_uat':
            baseUrl = 'https://gwl:gwl@uat.canadalifeinsure.ca/laurentianu/';
            environment = 'uat';
            break;
        case  'canadore_pr':
            baseUrl = 'https://www.canadalifeinsure.ca/canadore/';
            environment = 'www';
            break;
        case  'canadore_uat':
            baseUrl = 'https://gwl:gwl@uat.canadalifeinsure.ca/canadore/';
            environment = 'uat';
            break;
        case  'rfp_pr':
            baseUrl = 'https://www.myworkplacebenefits.ca/marriott/';
            environment = 'www';
            heroTitleTxt = `Welcome to the health and wellness site!`;
            subTitleTxt = `Your group benefits plan`, subTitleTxtFr = `Votre régime de garanties collectives`, subTitleTxt2 = `Your group retirement and savings plans`;
            break;
        case  'rfp_uat':
            baseUrl = 'https://gwl:gwl@uat.myworkplacebenefits.ca/marriott/';
            environment = 'uat';
            break;
        case  'lifeco_pr':
            baseUrlLifeco = 'https://www.greatwestlifeco.com/';
            baseUrlFrLifeco = `https://www.greatwestlifeco.com/fr.html`;
            heroTxtLifeco = `Delivering on our commitments.`;
            //     Today and tomorrow.`;
            heroTxtFrLifeco = `Respecter nos engagements.
Aujourd’hui et demain.`;
            environment = 'www';
            break;
        case  'lifeco_qa':
            baseUrlLifeco = 'https://qa.greatwestlifeco.com/';
            heroTxtLifeco = `Delivering on our commitments.
            Today and tomorrow.`;
            environment = 'qa';
            break;
        case  'lifeco_uat':
            baseUrl = 'https://gwl:gwl@uat.greatwestlifeco.com/';
            heroTxt = `Delivering on our commitments.
Today and tomorrow.`;
            environment = 'uat';
            break;
        default:
            throw new Error('You did not specify a known environment in the command line');
    }
};

function setupReporters() {
    jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: "all"
    }));

    const now = new Date();
    const savePath = `${os.userInfo().homedir}/fet-e2e/corp_sites/reports/Mobile_`
        + argv.suite.toUpperCase() + '_' + now.toDateString() + ' ' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + "/";

    jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
            savePath: savePath,
            screenshotsFolder: "images",
            filePrefix: 'report',
            takeScreenshotsOnlyOnFailures: false,
            consolidate: true,
            consolidateAll: true
        })
    );
}

module.exports.config = config;
