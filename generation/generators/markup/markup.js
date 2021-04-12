const logger = require('../../logger');

const scopers = [
    require('./scopers/objectScope'),
    require('./scopers/arrayScope'),
];

const parsers = [
    require('./parsers/propertyDataStructure'),
    require('./parsers/arrayDataStructures'),
    require('./parsers/arrayRefs'),
    require('./parsers/arrayDynamicRefs'),
    require('./parsers/propertyRef'),
    require('./parsers/propertyDefault'),
    require('./parsers/arraySimpleTypes'),
];

const generateMarkup = function(options) {
    for(let property in options.data) {
        options.value = options.data[property];

        logger.log({
            level: 'info',
            message: `Checking ${JSON.stringify(property, null, 4)} ${JSON.stringify(options.value, null, 4)}`
        });

        scopers.forEach(function(scoping) {
            if(scoping.isValid(options)) {
                let fragmentOptions = { ...options,  ...{
                    absolutePath: options.absolutePath.concat(property),
                    relativePath: options.relativePath.concat(property),
                    classArray: options.classArray.concat(property),
                }};

                let fragment = scoping.run(fragmentOptions);

                let fragmentMarkupOptions = { ...options,  ...{
                    output: '',
                    data: fragment.data,
                    absolutePath: options.absolutePath.concat(property),
                    relativePath: fragment.relativePath,
                    classArray: fragment.classArray
                }};
                
                options.output += fragment.openingTag;
                options.output += generateMarkup(fragmentMarkupOptions);
                options.output += fragment.closingTag;
            }
        });

        for(let parser of parsers) {
            if(parser.isValid(options)) {
                let fragmentOptions = { ...options,  ...{
                    property: property,
                    absolutePath: options.absolutePath.concat(property),
                    relativePath: options.relativePath.concat(property),
                    classArray: options.classArray.concat(property),
                }};
                options.output += parser.run(fragmentOptions);
                break;
            }
        };
    }
    logger.log({
        level: 'info',
        message: options.output
    });
    return options.output;
};

const run = function(markup, cardSettings, json, config) {
    logger.log({
        level: 'info',
        message: 'Card settings= ' + cardSettings
    });
    logger.log({
        level: 'info',
        message: 'json= ' + json
    });
    let options = { ...config,  ...{
        output: '', 
        cardSettings: cardSettings, 
        data: json,
        absolutePath: [],
        relativePath: [],
        classArray: [],
    }};
    let content = generateMarkup(options);
    let insertIndicatorText = '<!-- YUZU MARKUP -->';
    let insertPosition = markup.toUpperCase().indexOf(insertIndicatorText);

    logger.log({
        level: 'info',
        message: 'Run complete'
    });

    // Insert content into markup
    markup = markup.substr(0, insertPosition) + content + markup.substr(insertPosition + insertIndicatorText.length);

    return {
        full: markup,
        content: content
    };
};

module.exports = {generateMarkup, run};