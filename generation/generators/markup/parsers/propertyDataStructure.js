const trimRefValue = require('../services/trimRefValue');

const isValid = function (options) {
    return options.value.$ref !== undefined &&  options.dataStructures.hasOwnProperty(trimRefValue.run(options.value.$ref));
};

const run = function (options) {
    let refValue = trimRefValue.run(options.value.$ref);
    let contentOptions = { ...options,  ...{
        value: refValue,
    }};
    return options.markupFragments.dataStructureMarkupFragments[refValue](contentOptions);
};

module.exports = { isValid, run };