const propertyParsers = [
    require('./parsers/defaultPropertyParser'),
    require('./parsers/simplePropertyParser'),
    require('./parsers/subBlockAsPropertyParser'),
    require('./parsers/subBlockAsObjectParser')
];

const createCardJson = function (text, config) {
    let lines = text.split('\n'),
        obj = {},
        prefixes = config.prefixes;

    // Remove prefix and generate property
    lines.forEach (function(line, index) {
        if(index > 0) {
            line =  line.replace(prefixes.property.card, '');

            if(line) {
                // Remove whitespace
                line = line.replace(/\s+/g, '');

                if(line !== '') {
                    let segments = line.split('+');
            
                    propertyParsers.forEach(function(parser) 
                    {
                        if(parser.isValid(segments))
                        {
                            parser.run(segments, obj, config);
                        }
                    });    
                }
            }
        }
    });

    return obj;
}

const removeDataStructureRefs = function(json, config) {
    let cleanedJson = JSON.stringify(json),
        dataStructures = config.dataStructures;

    for(const structure in dataStructures) {
        const ref = `{"$ref":"/${structure}"}`,
            newJson = dataStructures[structure],
            regex = new RegExp(ref,"g");
        cleanedJson = cleanedJson.split(ref).join(JSON.stringify(newJson));
    }

    return JSON.parse(cleanedJson);
}

module.exports = {createCardJson, removeDataStructureRefs};


