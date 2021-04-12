const isValid = function (options) {
    const isArray = Array.isArray(options.value);
    const isRefArray = (options.value[0] && options.value[0].$ref !== undefined);
    const hasArrayObjectChild = Array.isArray(options.value[0]) || Object.prototype.toString.call(options.value[0]) === '[object Object]';
    return isArray && !isRefArray && hasArrayObjectChild;
};

const run = function (options) {
    let tags = options.markup.fragments.wrapperMarkupFragments.array;
    let openingTagMarkup = '';
    let closingTagMarkup = '';

    openingTagMarkup = tags.parentWrapperOpening(options);
    closingTagMarkup = tags.parentWrapperClosing(options);

    return {
        data: options.value[0],
        relativePath: options.relativePath,
        openingTag: openingTagMarkup,
        closingTag: closingTagMarkup,
        classArray: options.classArray
    };
};

module.exports = { isValid, run };