const _ = require('lodash'),
    helper = require('./dataHelper');

const set = function(obj, segments, scope, typeIndexes, getValueFromSegment, settings) {
    let name = helper.getSegmentAttribute(segments, typeIndexes, 'name'),
        propertyParent = _.get(obj, scope.string, undefined),
        propertyParentValue = _.get(obj, scope.path, undefined);

    if(propertyParent != undefined || scope.string.length === 0) {

        let value = getValue(segments, typeIndexes, getValueFromSegment, settings);

        if(name)
            _.set(obj, scope.string != '' ? scope.string + '.' + name : name, value);
        else
            _.set(obj, scope.string, value);
    }
    else {
        console.error(`Unable to create property "${name}" in "${scope.path}". Ensure "${scope.path}" is initialised.`);
    }
};

const getValue = function(segments, typeIndexes, getValueFromSegment, config) {

    let typeValue = getValueFromSegment ? helper.getSegmentAttribute(segments, typeIndexes, 'value') : undefined,
        propertyType = config.propertyTypes[helper.getSegmentAttribute(segments, typeIndexes, 'type')];

    if(propertyType)
        return propertyType.defaultValue(typeValue);
    else
        return '';

};

module.exports = { set };