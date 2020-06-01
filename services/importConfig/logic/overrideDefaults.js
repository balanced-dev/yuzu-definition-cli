const _ = require('lodash');

const run = function(defaults, overrides) {
    let output = {};

    for (const key in defaults) {
        if (overrides.hasOwnProperty(key)) {
            output[key] = _.defaultsDeep(overrides[key], defaults[key]);
        }
    }

    return output;
};

module.exports = run;