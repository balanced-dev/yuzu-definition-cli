const _ = require('lodash');

const buildLocation = function(segments, obj) {
    let locationString = '',
        value = undefined;    

    for (let index = 0; index < segments.length; index++) {
        locationString += locationString == '' ? segments[index] : '.' + segments[index];

        value = _.get(obj, locationString, undefined);

        if (Array.isArray(value)) {
            if(isRefArray(value)) {
                locationString += '['+ value.length +']';
                _.set(obj, locationString, {});
            }
            else {
                locationString += '[0]';
            }
        }
    }

    return {
        string: locationString,
        object: obj
    };
};

const isRefArray = function(value) {
    return value.length > 0 && value[0].$ref;
};

const removeUnwantedPropertyAttributes = function(segments, structure, settings) {
    let attributeCountToRemove = Object.keys(structure).length - 1; // -1 because 'type' will be removed if set

    // Remove any type keywords from segments array (e.g. string, array, object...)
    segments = segments.filter(function(segment) {
        return settings.propertyTypes[segment] === undefined;
    });

    // Trim end of array to remove property attributes (ie. name, subblock value)
    if(segments.length >= attributeCountToRemove) {
        segments.splice(-Math.abs(attributeCountToRemove), attributeCountToRemove);
    }

    return segments;
};

const get = function(segments, obj, structure, settings)
{
    segments = removeUnwantedPropertyAttributes(segments, structure, settings);
    let location = buildLocation(segments, obj);

    return {
        string : location.string,
        path : segments,
        object : location.object
    }
};

module.exports = {  get: get, buildLocation: buildLocation, removeUnwantedPropertyAttributes: removeUnwantedPropertyAttributes }