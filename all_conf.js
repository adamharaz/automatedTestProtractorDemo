/* eslint-env node, jasmine, protractor */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const Jasmine2HtmlReporter = require("protractor-jasmine2-html-reporter");
const argv = require('optimist').argv;
const os = require(`os`);
const HtmlReporter = require('protractor-beautiful-reporter');

const params = {
    superuser: {
        username: 'superuser',
        password: 'password',
    },
    report: {
        fancy: true,
    },
    screenshotSizes: [
        {
            // browserName: 'phantomjs',  //todo comment for now
            sizes: [
                {width: 320, height: 480}, // iPhone portrait
                {width: 768, height: 1024} // iPad landscape
            ]
        },
        {
            browserName: 'chrome',
            sizes: [
                {width: 500, height: 500},
            ]
        }
    ],
    appUrl: 'https://gwl.com',
};

const setBrowser = (br) => {
    //let browserName = 'chrome'; //todo comment this out
    if (br === `chrome` || br === `ch`) {
        browserName = 'chrome';
    } else if (br === `firefox` || br === `ff`) {
        browserName = 'firefox';
    } else if (br === `safari` || br === `sf`) {
        browserName = 'safari';
    } else if (br === `internet explorer` || br === `ie`) {
        browserName === 'internet explorer';
    } else {
        browserName = 'chrome';
    }
    return browserName;
};

const setAuth = (autho) => {

    let auth = ` `;

    if (autho === `careers_pr` || autho === `apm_pr`) {
        auth = ``;
    }
/*    else if (autho === `smoke_uat`) {
        environment1 = `aempublish62-prod-blue-0:4503`; //'10.6.2.5:4503';  //http://aempublish62-uat-0:4503
        environment2 = `aempublish62-prod-blue-1:4503`;
    }*/
    else if (autho === `smoke_pr2`) {
        auth = `origin`;
    }
    else if (autho.split('_').pop() === `pr`) {
        auth = `www`;
    } else if (autho.split('_').pop() === `uat`) {
        auth = `gwl:gwl@uat`;
    } else if (autho.split('_').pop() === `qa`) {
        auth = `gwl:gwl@qa`;
    }
    /*    else if (enviro.split('_').pop() === `www` || enviro === `careers_pr`) {
               environment = '';
               auth = ``;
           }*/
    return auth;
};

const setEnviro = (enviro) => {

    let environment = ` `;

    if (enviro === `careers_pr` || enviro === `apm_pr`) {
        environment = ``;
    } else if (enviro === `smoke_pr2`) {
        environment = `origin`;
    }
    else if (enviro.split('_').pop() === `pr`) {
        environment = `www`;
    } else if (enviro.split('_').pop() === `uat`) {
        environment = `uat`;
    } else if (enviro.split('_').pop() === `qa`) {
        environment = `qa`;
    }
    /*    else if (enviro.split('_').pop() === `www` || enviro === `careers_pr`) {
               environment = '';
               auth = ``;
           }*/
    return environment;
};

const setBaseURL = (brand) => {
    switch (brand) {
        case 'careers':
            baseUrlCareers = `https://${setAuth(argv.env)}careers.greatwestlife.com/`;
            baseUrlFrCareers = `https://${setAuth(argv.env)}careers.greatwestlife.com/fr.html`;
            heroTxtCareers = `Discover your opportunity`;
            heroTxtFrCareers = `Saisissez l’occasion de jouer un rôle clé`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case 'quad':
            baseUrlQuad = `https://${setAuth(argv.env)}.quadrusinvestmentservices.com/`;
            baseUrlFrQuad = `https://${setAuth(argv.env)}.quadrusinvestmentservices.com/fr.html`;
            heroTxtQuad = `Helping mutual fund investors paint a successful financial future`;
            heroTxtFrQuad = `Nous aidons les investisseurs de fonds communs à bâtir un avenir financier prospère`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case 'ff_pr':
            baseUrlFF = 'https://origin.freedom55financial.com/ff/home';
            baseUrlFrFF = `https://origin.financiereliberte55.com/ff/home?lang=fr`;
            heroTxtFF = `Get simple coverage`;
            heroTxtFrFF = `Protégez vos proches, simplement et à moindre coût`;
            environment = 'www';
            break;
        case 'any_pr':
            environment = 'www';
            break;
        case 'pelican_pr':
            baseUrlPelican = 'https://pelican.thenest.canadalife.com/';
            break;
        case  'll':
            baseUrlLL = `https://${setAuth(argv.env)}.londonlife.com/`;
            baseUrlFrLL = `https://${setAuth(argv.env)}.londonlife.com/fr.html`;
            heroTxtLL = `You know your goals, we’ll help you reach them with Constellation`;
            baseUrlLLFr = 'https://www.londonlife.com/fr.html';
            heroTxtFrLL = `Vous avez des objectifs, nous vous aidons à les atteindre grâce à Constellation`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'cl':
            baseUrlCL = `https://${setAuth(argv.env)}.canadalife.com/`;
            baseUrlFrCL = `https://${setAuth(argv.env)}.canadalife.com/fr.html`;
            heroTxtCL = `Help protect your family, build up cash value`;
            heroTxtFrCL = `Aidez à protéger votre famille tout en accumulant une valeur de rachat`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'atm':
            baseUrlATM = `https://${setAuth(argv.env)}.advisory-network.ca/`;
            baseUrlFrATM = `https://${setAuth(argv.env)}.advisory-network.ca/fr.html`;
            heroTxtATM = `We’ll succeed by working together`;
            heroTxtFrATM = `ravailler ensemble pour réussir`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'gwl':
            baseUrlGWL = `https://${setAuth(argv.env)}.greatwestlife.com/`;
            baseUrlFrGWL = `https://${setAuth(argv.env)}.greatwestlife.com/fr/vous-et-votre-famille.html`;
            heroTxtGWL = `Get simple coverage`;
            heroTxtFrGWL = `Protégez vos proches, simplement et à moindre coût`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'horizon':
            baseUrlWTW = `https://${setAuth(argv.env)}.myhorizon.ca/myhorizon.html`;
            baseUrlFrWTW = `https://${setAuth(argv.env)}.monhorizon.ca/monhorizon.html`;
            heroTxtWTW = `Make the most of your financial future!`;
            heroTxtFrWTW = `Faites fructifier votre avenir financier`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case `telus_pr`:
            baseUrlTelus = `https://TELUS:forgettable@www.myworkplacebenefits.ca/telus-gwl/group-benefits.html`;
            heroTxtTelus = `Let us show you what we can do for TELUS`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case `telus_uat`:
            baseUrlTelus = `https://TELUS:forgettable@uat.myworkplacebenefits.ca/telus-gwl/group-benefits.html`;
            heroTxtTelus = `Let us show you what we can do for TELUS`;
            environment = 'uat';
            break;
        case `telus_qa`:
            baseUrlTelus = `https://TELUS:forgettable@qa.myworkplacebenefits.ca/telus-gwl/group-benefits.html`;
            heroTxtTelus = `Let us show you what we can do for TELUS`;
            environment = 'qa';
            break;
        case `telus_yellow`:
            baseUrlTelus = `https://TELUS:forgettable@dev-yellow.myworkplacebenefits.ca/telus-gwl/group-benefits.html`;
            heroTxtTelus = `Let us show you what we can do for TELUS`;
            environment = 'dev-yellow';
            break;
        case  'forms':
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            url = `https://${setAuth(argv.env)}.greatwestlife.com/you-and-your-family.html`;
            baseUrlGLC = `https://${setAuth(argv.env)}.glc-amgroup.com/`;
            baseUrlFrGLC = `https://${setAuth(argv.env)}.glc-amgroup.com/fr.html`;
            heroTxtGLC = 'Why GLC';
            heroTxtFrGLC = "Pourquoi choisir GLC";
            break;
        case  'forms_w2':
            environment = 'www2';
            break;
        case  'gwl_w2':
            environment = 'www2';
            break;
        case  'smoke':
            environment1 = `aempublish62-prod-blue-0:4503`; //'10.6.2.5:4503';  //http://aempublish62-uat-0:4503
            environment2 = `aempublish62-prod-blue-1:4503`; //'10.6.2.6:4503';  //http://aempublish62-uat-1.greatwestlifedigital.net:4503/content/gwl/en_ca/you-and-your-family.htm
            heroTxt = `Get simple coverage`;
            heroTxtFr = `Protégez vos proches, simplement et à moindre coût`;
            baseUrlF55 = `https://${setAuth(argv.env)}.freedom55financial.com/`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'lifeco':
            baseUrlLifeco = `https://${setAuth(argv.env)}.greatwestlifeco.com/`;
            baseUrlFrLifeco = `https://${setAuth(argv.env)}.greatwestlifeco.com/fr.html`;
            heroTxtLifeco = `Delivering on our commitments.`;
            heroTxtFrLifeco = `Respecter nos engagements.`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'apm':
            baseUrlAPM = `https://${setAuth(argv.env)}.program.canadalife.com/platinum/`;
            baseUrlFrAPM = `https://${setAuth(argv.env)}.program.canadalife.com/platinum/fr`;
            heroTxtAPM = `Canada Life Platinum Symposium`;
            heroTxtFrAPM = `Canada Vie Symposium Platine`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'rif':
            baseUrl_RIF_GWL = `https://gwl:gwl@qa.greatwestlife.com/rrif-lif-calculator.html#/`;
            baseUrl_RIF_GWL_Fr = `https://gwl:gwl@qa.greatwestlife.com/fr/rrif-lif-calculator.html#/`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'kyr':
            baseUrl_KYR_CL = `https://${setAuth(argv.env)}.canadalife.com/insurance/personal-insurance/risk-calculator.html#/`;
            baseUrl_KYR_CL_Fr = `https://${setAuth(argv.env)}.canadalife.com/fr/assurance/assurance-personnelle/calculateur-risque.html#/`;
            baseUrl_KYR_LL = `https://${setAuth(argv.env)}.londonlife.com/our-products/individual-insurance/risk-calculator.html#/`;
            baseUrl_KYR_LL_Fr = `https://${setAuth(argv.env)}.londonlife.com/fr/nos-produits/assurance-individuelle/calculateur-risque.html`;
            baseUrl_KYR_GWL = `https://${setAuth(argv.env)}.greatwestlife.com/you-and-your-family/products/protection-for-your-life/risk-calculator.html#/`;
            baseUrl_KYR_GWL_Fr = `https://${setAuth(argv.env)}.greatwestlife.com/fr/vous-et-votre-famille/produits/protection-pour-vous-et-votre-famille/calculateur-risque.html#/`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'glc':
            baseUrlGLC = `https://${setAuth(argv.env)}.glc-amgroup.com/`;
            baseUrlFrGLC = `https://${setAuth(argv.env)}.glc-amgroup.com/fr.html`;
            heroTxtGLC = 'Why GLC';
            heroTxtFrGLC = "Pourquoi choisir GLC";
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'glc_PR':
            baseUrlGLC = 'https://www.glc-amgroup.com/';
            baseUrlFrGLC = 'https://www.glc-amgroup.com/fr';
            environment = 'qa';
            break;
        case  'amex_pr':
            baseUrlAMEX = 'https://www.canadalifeinsure.ca/amex/';
            environment = 'www';
            break;
        case  'amex_uat':
            baseUrlAMEX = 'https://gwl:gwl@uat.canadalifeinsure.ca/amex/';
            environment = 'uat';
            break;
        case  'glc_yellow':
            baseUrlGLC = 'https://gwl:gwl@dev-yellow.glc-amgroup.com/';
            baseUrlFrGLC = 'https://gwl:gwl@dev-yellow.glc-amgroup.com/fr.html';
            environment = 'dev-yellow';
            heroTxtGLC = 'Why GLC';
            heroTxtFrGLC = "Pourquoi choisir GLC";
            auth = `gwl:gwl@dev-yellow`;
            break;
        case  'f55':
            baseUrlF55 = `https://${setAuth(argv.env)}.freedom55financial.com/`;
            baseUrlFrF55 = `https://${setAuth(argv.env)}.freedom55financial.com/fr.html`;
            heroTxtF55 = `Low-cost holiday gift ideas that celebrate the spirit of giving`;
            heroTxtFrF55 = `Idées cadeaux à petit prix pour souligner l'esprit de partage du temps des Fêtes`;
            environment = setEnviro(argv.env);
            auth = setAuth(argv.env);
            break;
        case  'f55_pr':
            baseUrlF55 = `https://www.freedom55financial.com/`;
            baseUrlFrF55 = `https://www.freedom55financial.com/fr.html`;
            heroTxtF55 = `Low-cost holiday gift ideas that celebrate the spirit of giving`;
            heroTxtFrF55 = `Idées cadeaux à petit prix pour souligner l'esprit de partage du temps des Fêtes`;
            environment = 'www';
            break;
        case  'f55_qa':
            baseUrlF55 = `https://gwl:gwl@qa.freedom55financial.com/`;
            baseUrlFrF55 = `https://gwl:gwl@qa.freedom55financial.com/fr.html`;
            heroTxtF55 = `Low-cost holiday gift ideas that celebrate the spirit of giving`;
            heroTxtFrF55 = `Idées cadeaux à petit prix pour souligner l'esprit de partage du temps des Fêtes`;
            environment = 'gwl:gwl@qa';
            break;
        case  'f55_yellow':
            baseUrlF55 = `https://gwl:gwl@dev-yellow.freedom55financial.com/`;
            baseUrlFrF55 = `https://gwl:gwl@dev-yellow.freedom55financial.com/fr.html`;
            heroTxtF55 = `Low-cost holiday gift ideas that celebrate the spirit of giving`;
            heroTxtFrF55 = `Idées cadeaux à petit prix pour souligner l'esprit de partage du temps des Fêtes`;
            environment = 'gwl:gwl@dev-yellow';
            break;
        default:
            throw new Error('You did not specify a known environment in the command line');
    }
};

const disableAngularPageStateDetection = () => {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
};

const browserToUse = () => {
    if ((process.env.E2EBROWSER || '') !== '') {
        // eslint-disable-next-line no-console
        console.log(`Browser: Using "${process.env.E2EBROWSER}" from environment variable E2EBROWSER.`);
        return process.env.E2EBROWSER;
    }
    // eslint-disable-next-line no-console
    console.log('Browser: Using Chrome (default).');
    return 'chrome';
};


const useFancyReporter = () => {
    const specReporter = new SpecReporter({
        displayStacktrace: 'all',
    });

    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(specReporter);
};


const config = {
    params,
    directConnect: true,

    suites: {
        careers: 'suites/desktop/careers/*.spec.js',
        atm: 'suites/desktop/atm/*.spec.js',
        glc: 'suites/desktop/glc/*.spec.js',
        apm: 'suites/desktop/apm/*.spec.js',
        amex: 'suites/desktop/amex/*.spec.js',
        gwl: 'suites/desktop/gwl/*.spec.js',
        ll: 'suites/desktop/ll/*.spec.js',
        forms: 'suites/desktop/forms/*.spec.js',
        ff: 'suites/ff/*.spec.js',
        smoke: `suites/smoke/gwl_smoke/*.spec.js`,
        horizon: `suites/desktop/horizon/*.spec.js`,
        telus: `suites/desktop/telus/*.spec.js`,
        pelican: `suites/pelican/*.spec.js`,
        cl: `suites/desktop/cl/*.spec.js`,
        lifeco: `suites/desktop/lifeco/*.spec.js`,
        quad: `suites/desktop/quad/*.spec.js`,
        all: `suites/desktop/*/*.spec.js`,
        any: `suites/any/*.spec.js`,
        f55: `suites/desktop/f55/*.spec.js`,
        kyr: `suites/desktop/kyr/*.spec.js`,
        rif: `suites/desktop/rif/*.spec.js`,
    },

    framework: 'jasmine2',
    /*    specs: {
            careers: 'careers/!*.spec.js',
            glc: 'glc/!*.spec.js',
        },*/
    //exclude: ['execuled.spec.js'],

    multiCapabilities: {
        shardTestFiles: true,
        maxInstances: 30,    //use 30 instances
        browserName: setBrowser(argv.br),
        chromeOptions: {
            // http://peter.sh/experiments/chromium-command-line-switches/
            args: ['incognito', '--disable-cache', '--disable-extensions'],
        },
    },

    onPrepare: () => {
        if (argv.env) setAuth(argv.env);
        if (argv.env) setBaseURL(argv.suite);

        console.warn(`*** ENV: ${argv.env.split('_').pop().toUpperCase()} ***`);
        console.warn(`*** CORP SITE: ${argv.suite.toUpperCase()} ***`);

        require('./helpers/waitReady.js');  // eslint-disable-line global-require
        require('./helpers/waitAbsent.js'); // eslint-disable-line global-require

        setupReporters();
        disableAngularPageStateDetection();
        setBrowserWindowSize();
            //todo uncomment here  
        // createProtractorBeautifulReport();  //todo comment here!!! Feb 26 2019
        /*        jasmine.getEnv().addReporter(new HtmlReporter({
                    baseDirectory:  `${os.userInfo().homedir}/fet-e2e/corp_sites/reports/screenshots`
                }).getJasmine2Reporter());*/
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000, // 10 seconds
    },
};

function setupReporters() {
    jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: "all"
    }));

    const now = new Date();
    const savePath = `${os.userInfo().homedir}/fet-e2e/corp_sites/Reports/Desktop_`
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

// Maximizes browser window
function setBrowserWindowSize() {
    setTimeout(function () {
        browser.driver
            .executeScript(function () {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
            })
            .then(function (result) {
                browser.driver.manage().window().setSize(result.width, result.height);
            });
    });
}

function setupReporters() {
    jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: "all"
    }));
//Todo the following code creates different kind of reports.
    /*    const now = new Date();
        const savePath = `${os.userInfo().homedir}/fet-e2e/corp_sites/reports/Desktop_`
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
        );*/
}

function createProtractorBeautifulReport() {
    const now = new Date();
    jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: `${os.userInfo().homedir}/fet-e2e/corp_sites/reports/report_`
        + now.toDateString() + ' ' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + "/" + argv.env.toUpperCase()
        , takeScreenShotsOnlyForFailedSpecs: true
        , excludeSkippedSpecs: true
    }).getJasmine2Reporter());
}

module.exports.config = config;
