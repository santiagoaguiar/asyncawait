﻿var oldBuilder = require('../src/asyncBuilder');
var Promise = require('bluebird');

var builder = oldBuilder.derive(function () {
    return ({
        invoke: function (co) {
            co.resolver = Promise.defer();
            co.enter();
            return co.resolver.promise;
        },
        return: function (co, result) {
            return co.resolver.resolve(result);
        },
        throw: function (co, error) {
            return co.resolver.reject(error);
        },
        yield: function (co, value) {
            return co.resolver.progress(value);
        },
        finally: function (co) {
            co.resolver = null;
        }
    });
});
module.exports = builder;
//# sourceMappingURL=promise.js.map
