const camelCase = require('camelcase');

const isValid = function(segments)
{
    return (segments.length == 1);
};

const run = function(segments, object, config)
{
    let name = camelCase(segments[0]);

    object[name] = config.propertyTypes['string'].defaultValue();
};

module.exports= { isValid: isValid, run: run  }

