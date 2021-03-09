const trimRefValue = require('../services/trimRefValue');
const generateChildClass = require('../services/generateChildClass');
    
const isValid = function (options) {
    const isArray = Array.isArray(options.value);
    const isArrayRefs = options.value[0] && options.value[0].$ref;
    const isSingleSubBlockType = options.value.length === 1;    
    let isDataStructure = false; 
        
    if(isArrayRefs) {
        isDataStructure = options.dataStructures.hasOwnProperty(trimRefValue.run(options.value[0].$ref));
    }
    return (isArray && isArrayRefs && isSingleSubBlockType && isDataStructure);
};

const run = function (options) {
    let refValue = trimRefValue.run(options.value[0].$ref);
    let wrapperTags = options.markupFragments.wrapperMarkupFragments.array;
    let contentTags = options.markupFragments.dataStructureMarkupFragments;
    let childClassArray = generateChildClass([...options.classArray], options.markupSettings);

    let openingTagMarkup = wrapperTags.dataStructuresOpening(options);
    
    let contentOptions = { ...options,  ...{
        value: refValue,
        classArray: childClassArray,
        isArray: true
    }};

    let contentTagMarkup = contentTags[refValue](contentOptions);
    let closingTagMarkup = wrapperTags.dataStructuresClosing(options);
        
    return openingTagMarkup + contentTagMarkup + closingTagMarkup;
};

module.exports = { isValid, run };