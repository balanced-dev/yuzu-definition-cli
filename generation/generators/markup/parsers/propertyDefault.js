const isValid = function (options) {
    const isArray = Array.isArray(options.value);
    const isObject =  options.value === Object(options.value);
    return (!isArray && !isObject);
};

const run = function (options) {
    return options.markup.fragments.contentMarkupFragments.default(options);
};

module.exports = { isValid, run };