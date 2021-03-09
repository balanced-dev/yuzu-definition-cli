const trimRefValue = require('../services/trimRefValue');

const isValid = function (options) {
    let isArray = Array.isArray(options.value);
    let isArrayRefs = options.value[0] && options.value[0].$ref;
    let isSingleSubBlockType = options.value.length === 1;
    
    return (isArray && isArrayRefs && isSingleSubBlockType);
};

const run = function (options) {
    let refValue = trimRefValue.run(options.value[0].$ref);
    let wrapperTags = options.markupFragments.wrapperMarkupFragments.array;
    let contentTags = options.markupFragments.contentMarkupFragments;

    
    let openingTagMarkup = wrapperTags.refsOpening(options);
    let contentOptions = { ...options,  ...{
        value: refValue,
        isArray: true
    }};
    let contentTagMarkup = contentTags.namedSubBlockArray(contentOptions);
    let closingTagMarkup = wrapperTags.refsClosing(options);
        
    return openingTagMarkup + contentTagMarkup + closingTagMarkup;
};

module.exports = { isValid, run };