const trimRefValue = require('../services/trimRefValue');
const generateChildClass = require('../services/generateChildClass');
    
const isValid = function (options) {
    let isArray = Array.isArray(options.value);
    let isSingleArrayType = options.value.length === 1;
    let hasArrayObjectChild = Array.isArray(options.value[0]) || Object.prototype.toString.call(options.value[0]) === '[object Object]';
    return isArray && isSingleArrayType && !hasArrayObjectChild;
};

const run = function (options) {
    let refValue = trimRefValue.run(options.value[0].$ref);
    let wrapperTags = options.markup.fragments.wrapperMarkupFragments.array;
    let contentTags = options.markup.fragments.contentMarkupFragments;
    let childClassArray = generateChildClass([...options.classArray], options.style.settings);

    let openingTagMarkup = wrapperTags.simpleTypeOpening(options);
    
    let contentOptions = { ...options,  ...{
        value: refValue,
        classArray: childClassArray,
        isArray: true
    }};

    let contentTagMarkup = contentTags.default(contentOptions);
    let closingTagMarkup = wrapperTags.simpleTypeClosing(options);
        
    return openingTagMarkup + contentTagMarkup + closingTagMarkup;
};

module.exports = { isValid, run };