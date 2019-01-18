/* eslint-env jasmine, protractor */

class StatePO {
    constructor() {
        this.$stateName = $('h1[data-qa="stateName"]');
        this.$stateCapital = $('h2[data-qa="stateCapital"]');
        this.$stateLargestCity = $('h3[data-qa="stateLargestCity"]');

    }
}

module.exports = StatePO;




