/*
/!* eslint-env node, jasmine, protractor *!/
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const Jasmine2HtmlReporter = require("protractor-jasmine2-html-reporter");
const argv = require('optimist').argv;
const os = require(`os`);

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
            browserName: 'phantomjs',
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
    let browserName = 'chrome';
    if (br === `chrome` || br === `ch`) {
        browserName = 'chrome';
    } else if (br === `firefox` || br === `ff`) {
        browserName = 'firefox';
    } else if (br === `safari` || br === `sf`) {
        browserName = 'safari';
    } else if (br === `internet explorer` || br === `ie`) {
        browserName === 'internet explorer';
    }
    console.warn(`Browser: Using ***... "${browserName}" ...***`);
    return browserName;
};

const setBaseURL = (env) => {
    switch (env) {
        case  'env1':

            break;
        case  'env2':

            break;
        default:
            throw new Error('You did not specify a known environment in the command line');
    }
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
        demo: 'suites/desktop/demo/!*.spec.js',
    },

    framework: 'jasmine2',


    multiCapabilities: {
        shardTestFiles: true,
        maxInstances: 30,    //use 30 instances
        browserName: setBrowser(argv.br),
        chromeOptions: {
            args: ['incognito', '--disable-cache', '--disable-extensions'],
        },
    },


    onPrepare: () => {
        if (argv.env) setBaseURL(argv.env);
        require('./helpers/waitReady.js');  // eslint-disable-line global-require
        require('./helpers/waitAbsent.js'); // eslint-disable-line global-require
        setupReporters();
        setBrowserWindowSize();
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
    const savePath = `${os.userInfo().homedir}/node-rest-states/Reports/Desktop_`
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

    const now = new Date();
    const savePath = `${os.userInfo().homedir}/node-rest-states/reports/Desktop_`
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
*/
