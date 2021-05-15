const propertyParsers = [
    require('./parsers/defaultPropertyParser'),
    require('./parsers/simplePropertyParser'),
    require('./parsers/subBlockAsPropertyParser'),
    require('./parsers/subBlockAsObjectParser')
];

const error_not_in_scope = 'not in scope';
const error_not_valid = 'not valid';

const createCardJson = function (card, config) {
    let lines = card.content.split('\n'),
        obj = {},
        cardConfig = config.generation.card,
        startIndex = findStartLineIndex(lines, cardConfig)
        hasEnded = false
        errors = [];

    lines.forEach ((line, index) => {
        
        if(index > startIndex && !hasEnded) {

            let results = validateAndGetSegments(line, cardConfig);
    
            if(!results.error && results.segments.length > 0) {
                propertyParsers.forEach(function(parser) 
                {
                    if(parser.isValid(results.segments, config))
                    {
                        parser.run(results.segments, obj, config, errors);
                    }
                });  
            }
            else if (results.error) {
                errors.push(`${line} (${results.error})`)
            }  
            else {
                hasEnded = true;
            }
        }
        else if (index != startIndex) {
            errors.push(`${line} (${error_not_in_scope})`)
        }

    });

    if(errors.length > 0) {
        config.logger.error(`Card parsing for ${card.name} has these errors`);
        errors.forEach((error) => { config.logger.error(error); }) 
    }

    return obj;
}

const validateAndGetSegments = (line, cardConfig) => {

    const output = {
        error: '',
        segments: []
    };

    if(!line) return output;

    const cardPrefix = cardConfig.propertyLinePrefix;
    if(!line.startsWith(cardPrefix)) {
        output.error = `incorrect property prefix`;
        return output;
    }
    
    line = line.replace(cardPrefix, '');

    if(!line) return output;

    line = removeWhitespace(line);

    output.segments = line.split('+');
    output.segments = output.segments.map((segment) => { return segment.trim(); })

    if(output.segments.some((segment) => { return segment ? false : true; })) {
        output.error = `has empty line segment`;
        return output;
    }

    const lastSegment = output.segments[output.segments.length - 1];
    if(!isFirstCharacterAlpha(lastSegment)) {
        output.error = `property name has first character that is non alpha`;
        return output;
    }

    return output;

}

const isFirstCharacterAlpha = (str) => {

    return str.length > 0 && str.charAt(0).match(/[a-z]/i);
}

const removeWhitespace = (line) => {
    return line.replace(/\s+/g, '');
}

const findStartLineIndex = (lines, cardConfig) => {

    return lines.findIndex((line) => { return line.startsWith(cardConfig.startLineContent) })
}

const removeDataStructureRefs = function(json, config) {
    let cleanedJson = JSON.stringify(json),
        dataStructures = config.generation.dataStructures;

    for(const structure in dataStructures) {
        const ref = `{"$ref":"/${structure}"}`,
            newJson = dataStructures[structure],
            regex = new RegExp(ref,"g");
        cleanedJson = cleanedJson.split(ref).join(JSON.stringify(newJson));
    }

    return JSON.parse(cleanedJson);
}

module.exports = {createCardJson, removeDataStructureRefs};


