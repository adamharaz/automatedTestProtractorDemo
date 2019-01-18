/*
'use strict';
// TODO npm install edge-js
const SQL = function () {
    var edge = require('edge');

    SQL.prototype.runQuery = function (connectionString, queryString, queryParams) {
        if (typeof queryParams === 'undefined') {
            queryParams = null; //query params are not required
        }

        const defer = protractor.promise.defer();
        const sqlParams = {};
        sqlParams.connectionString = connectionString;
        sqlParams.source = queryString;
        sqlParams.timeout = 60;
        const executeQuery = edge.func('sql', sqlParams);
        executeQuery(queryParams, function (error, result) {
            if (error) {
                throw error;
                console.log('\nError running query');
                defer.reject();
            }
            if (result) {
                console.log('\nQuery ran successfully');
                defer.fulfill(result);
            }
        });
        return defer.promise;
    };

/!*    SQL.prototype.getCurrentConnString = function () {
        const bp = browser.params;
        const currentEnv = bp.runtime_variables.env;
        switch (currentEnv.toUpperCase()) {
            case 'TX':
                return bp.SQLServerInvoices;
                break;

            case 'STAGING':
                return bp.SQLServerInvoicesStaging;
                break;
        }
    }*!/

};

module.exports = new SQL();

*/
