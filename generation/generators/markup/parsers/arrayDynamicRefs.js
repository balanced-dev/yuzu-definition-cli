const trimRefValue = require('../services/trimRefValue');

const isValid = function (options) {
    let isArray = Array.isArray(options.value);
    let isArrayRefs = options.value[0] && options.value[0].$ref;
    let isSingleSubBlockType = options.value.length === 1;
    
    return (isArray && isArrayRefs && !isSingleSubBlockType);
};

const run = function (options) {
    let refValue = trimRefValue.run(options.value[0].$ref);
    let wrapperTags = options.markup.fragments.wrapperMarkupFragments.array;
    let contentTags = options.markup.fragments.contentMarkupFragments;

    let openingTagMarkup = wrapperTags.dynamicRefsOpening(options);

    let contentOptions = { ...options,  ...{
        value: refValue
    }};

    let contentTagMarkup = contentTags.dynamicSubBlockArray(contentOptions);
    let closingTagMarkup = wrapperTags.dynamicRefsClosing(options);
        
    return openingTagMarkup + contentTagMarkup + closingTagMarkup;
};

module.exports = { isValid, run };