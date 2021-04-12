const isValid = function (options) {
    let isObject = options.value === Object(options.value);
    let isArray = Object.prototype.toString.call(options.value) === '[object Array]';
    let isRefObject = options.value.$ref !== undefined;
    return isObject && !isArray && !isRefObject;
};

const run = function (options) {
    let tags = options.markup.fragments.wrapperMarkupFragments.object;
    let openingTagMarkup = tags.openingTag(options);
    let closingTagMarkup = tags.closingTag(options);

    return {
        data: options.value,
        relativePath: options.relativePath,
        openingTag: openingTagMarkup,
        closingTag: closingTagMarkup,
        classArray: options.classArray,
        arrayCount: 0
    };
};

module.exports = { isValid, run };