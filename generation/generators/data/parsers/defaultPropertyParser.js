const camelCase = require('camelcase');

const isValid = function(segments)
{
    return (segments.length == 1);
};

const run = function(segments, object, config, errors)
{
    let name = camelCase(segments[0]);
    const isReservedKeyword = config.generation.reservedKeywords.includes(segments[0]);

    if(!isReservedKeyword) {
        object[name] = config.generation.propertyTypes['string'].defaultValue();
    }
    else {
        errors.push(`"${segments[0]}" cannot be used as a property name, it is a reserved keyword.`)
    }
};

module.exports= { isValid: isValid, run: run  }

