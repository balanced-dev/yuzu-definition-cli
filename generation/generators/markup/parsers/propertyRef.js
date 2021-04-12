const trimRefValue = require('../services/trimRefValue');

const isValid = function (options) {    
    return options.value.$ref !== undefined;
};

const run = function (options) {
    let refValue = trimRefValue.run(options.value.$ref);
    let contentOptions = { ...options,  ...{
        value: refValue
    }};

    return options.markup.fragments.contentMarkupFragments.subBlockObject(contentOptions);
};

module.exports = { isValid, run };