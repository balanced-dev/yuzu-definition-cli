const camelCase = require('camelcase');

const isValid = function(segments)
{
    return (segments.length == 1);
};

const run = function(segments, object, settings)
{
    let name = camelCase(segments[0]);

    object[name] = settings.propertyTypes['string'].defaultValue();
};

module.exports= { isValid: isValid, run: run  }

