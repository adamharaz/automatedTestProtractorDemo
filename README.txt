Installation Instructions
=========================
download and install:

- node.js: https://nodejs.org/
- WebStorm: https://www.jetbrains.com/webstorm/ or your prefered IDE
- run from command line:
  cd [location you pulled source code down to]
- Install Protractor globally `npm install -g protractor`  visit: https://www.protractortest.org/#/
- webdriver-manager update
- webdriver-manager start
************************No Need for the following step:*********************************************
- install npm packages: as follows:
  npm install jasmine-spec-reporter optimist os protractor-jasmine2-html-reporter url url-parse xmlhttprequest
  Or you can use Yarn visit: https://yarnpkg.com/lang/en/docs/cli/add/
  All dependencies listed in package.json and versions
*************************Avoid the above step only and execute the rest ********************************************
- From command line or WebStorm terminal: run:   `protractor <map to conf.js>/node-rest-states/conf.js`
  or you can do that from the terminal
- See reports of the tests under reports folder Deskyop-demo-date
- page_objects directory includes all the page objects like elements of the page
- Helpers should include all the helper functions such as BrowserFacade.isPageSettled();
- Suites should included all the tests (.spec)

tests:
- tests are written in jasmine: http://jasmine.github.io/2.2/introduction.html
- suites:
  - tests are grouped into suites using describe(...)
  - each test suite should be in a single file named '[suite-name].spec.js' and placed in the folder named 'suites'
  - each test suite should be capable of running in parallel with all other test suites
  - whenever possible a test suite should only log in once (in the first it(...) block)
- tests:
  - individual tests are created using it(...)
  - tests inside a suite run sequentially (top to bottom in the file)
  - tests should only interact with the abstraction layer (more details below) and they should not
    directly interact with the browser (do not call methods like get(), sendKeys(), click(), etc...)
  - I never use sleep(...) calls because they make tests fragile
  - protractor is aware when the browser has completed all pending actions (such as ajax requests) that run
    through angularjs, so usually we should not need to use wait(...), however I used some of my functions such as
    BrowserFacade.isPageSettled(); && BrowserFacade.isPageSettled that make sure all elements are loaded and page is settled
  - each test should be able to run alone and should not assume some prior step (except the precondition step)
    has been executed, this guarantees that if one test fails other tests will not cause many other tests to fail


debugging:
- it is important to remember that everything is a promise and most actions are registered in ControlFlows which
  execute at a later time, which means you often need to add a .then(...) call to set a breakpoint inside of
  https://code.google.com/p/selenium/wiki/WebDriverJs#Control_Flows
- once you have breakpoints set appropriately you can select from the menu Run -> Debug 'E2E' and it will
  hit your breakpoints during execution
- you can also start an interactive: http://angular.github.io/protractor/#/debugging#testing-out-protractor-interactively
  run from a command line: protractor --directConnect --elementExplorer

