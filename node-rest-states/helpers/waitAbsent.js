/**
 * Actively wait for an element to disappear either by becoming
 * invisible or by not being present. Wait up to specTimeoutMs
 * ignoring useless webdriver errors like StaleElementError.
 *
 * Usage:
 * Add `require('./waitAbsent.js');` in your onPrepare block or file.
 *
 * @example
 * expect($('.some-html-class').waitAbsent()).toBeTruthy();
 * see the link: https://gist.github.com/elgalu/e5be99c10df90d089af6
 */


// Config
const specTimeoutMs = 10000;

/**
 * Current workaround until https://github.com/angular/protractor/issues/1102
 * @type {Function}
 */

// eslint-disable-next-line no-undef
const ElementFinder = $('').constructor;

ElementFinder.prototype.waitAbsent = function () {
  const self = this;
  let driverWaitIterations = 0;
  let lastWebdriverError;
  function _throwError() {
    throw new Error(`Expected '${self.locator().toString()
            }' to be absent or at least not visible. ` +
            `After ${driverWaitIterations} driverWaitIterations. ` +
            `Last webdriver error: ${lastWebdriverError}`);
  }

  function _isPresentError(err) {
    lastWebdriverError = (err != null) ? err.toString() : err;
        // If there is an error trying to get the element the assume is gone
    return true;
  }

  // eslint-disable-next-line no-undef
  return browser.wait(() => {
    driverWaitIterations += 1;
    return self.isPresent().then((present) => {
      if (present) {
        return self.isDisplayed().then((visible) => {
          lastWebdriverError = `visible:${visible}`;
          return !visible;
        }, _isPresentError);
      }
      lastWebdriverError = `present:${present}`;
      return true;
    }, _isPresentError);
  }, specTimeoutMs).then((waitResult) => {
    if (!waitResult) { _throwError(); }
    return waitResult;
  }, (err) => {
    _isPresentError(err);
    _throwError();
    return false;
  });
};
